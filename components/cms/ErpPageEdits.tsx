"use client";

import { useLayoutEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { anyPlainSelectorResolves, applyPageEdits } from "@/lib/cms/apply-edits";
import { ERP_MAX_HIDE_MS as MAX_HIDE_MS, ERP_PENDING_ATTR } from "@/lib/cms/anti-flicker";
import { normalizeSlug } from "@/lib/cms/slug";
import type { PageEditInstruction } from "@/lib/cms/types";

// B5 (client-router mode) — applies ERP DOM edits on first load and after
// every client-side navigation. Mount ONCE in the root layout, BEFORE
// {children}: its layout-effect cleanup then runs in React's mutation phase
// ahead of the old page's removal, so moved nodes are back in place before
// React unmounts them (B6).

const DOM_WAIT_ATTEMPTS = 15;
const DOM_WAIT_INTERVAL_MS = 100;
const CLIENT_CACHE_MS = 60_000;

type EditsResponse = { edits: { instructions: PageEditInstruction[] } | null };

const responseCache = new Map<string, { at: number; promise: Promise<PageEditInstruction[] | null> }>();

function warn(...args: unknown[]) {
  if (process.env.NODE_ENV !== "production") console.warn("[erp-edits]", ...args);
}

function fetchEdits(slug: string): Promise<PageEditInstruction[] | null> {
  const cached = responseCache.get(slug);
  if (cached && Date.now() - cached.at < CLIENT_CACHE_MS) return cached.promise;

  const path = slug === "/" ? "/" : `/${slug}`;
  const promise = fetch(`/api/cms/page-edits?path=${encodeURIComponent(path)}`, { headers: { Accept: "application/json" } })
    .then((res) => (res.ok ? (res.json() as Promise<EditsResponse>) : { edits: null }))
    .then((body) => (Array.isArray(body?.edits?.instructions) ? body.edits.instructions : null))
    .catch((error) => {
      responseCache.delete(slug);
      warn("could not load edits", error);
      return null;
    });

  responseCache.set(slug, { at: Date.now(), promise });
  return promise;
}

function hide() {
  document.documentElement.setAttribute(ERP_PENDING_ATTR, "");
}

function reveal() {
  document.documentElement.removeAttribute(ERP_PENDING_ATTR);
}

export function ErpPageEdits({ editedSlugs, antiFlicker = true }: { editedSlugs: string[]; antiFlicker?: boolean }) {
  const pathname = usePathname();
  const edited = useMemo(() => new Set(editedSlugs), [editedSlugs]);

  useLayoutEffect(() => {
    const slug = normalizeSlug(pathname);
    if (!edited.has(slug)) {
      reveal();
      return;
    }

    let cancelled = false;
    let undo: (() => void) | null = null;
    let frame = 0;
    let retry: ReturnType<typeof setTimeout> | undefined;

    // Runs before paint on client navigations; on hard loads the inline
    // <head> script has already hidden <main>.
    if (antiFlicker) hide();
    const revealTimer = setTimeout(reveal, MAX_HIDE_MS);

    const applyWhenReady = (instructions: PageEditInstruction[], attempt: number) => {
      frame = requestAnimationFrame(() => {
        if (cancelled) return;
        if (!anyPlainSelectorResolves(instructions) && attempt < DOM_WAIT_ATTEMPTS) {
          // Route DOM may still be streaming in; try again shortly.
          retry = setTimeout(() => applyWhenReady(instructions, attempt + 1), DOM_WAIT_INTERVAL_MS);
          return;
        }
        try {
          const result = applyPageEdits(instructions);
          undo = result.undo;
        } catch (error) {
          warn("failed to apply edits", error);
        }
        reveal();
      });
    };

    fetchEdits(slug).then((instructions) => {
      if (cancelled) return;
      if (!instructions || instructions.length === 0) {
        reveal();
        return;
      }
      applyWhenReady(instructions, 0);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(retry);
      clearTimeout(revealTimer);
      // Restore moved/hidden/edited nodes before React touches them.
      undo?.();
      undo = null;
      reveal();
    };
  }, [pathname, edited, antiFlicker]);

  return null;
}
