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
// Live updates: while the tab is visible, re-check for edits this often (and
// immediately when the tab regains focus). Changes made in the CRM then show
// up without a refresh. The server coalesces polls (see the API route).
const LIVE_POLL_MS = 3000;

type EditsResponse = { edits: { version?: number | string | null; instructions: PageEditInstruction[] } | null };
type Edits = { instructions: PageEditInstruction[]; signature: string } | null;

// Only de-duplicates concurrent requests; results are never reused, so every
// navigation / poll sees the latest published edits.
const inFlight = new Map<string, Promise<Edits | undefined>>();

function warn(...args: unknown[]) {
  if (process.env.NODE_ENV !== "production") console.warn("[erp-edits]", ...args);
}

/** Resolves to the edits, null when the page has none, or undefined on error. */
function fetchEdits(slug: string): Promise<Edits | undefined> {
  const pending = inFlight.get(slug);
  if (pending) return pending;

  const path = slug === "/" ? "/" : `/${slug}`;
  const promise = fetch(`/api/cms/page-edits?path=${encodeURIComponent(path)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<EditsResponse>;
    })
    .then((body): Edits => {
      const instructions = body?.edits?.instructions;
      if (!Array.isArray(instructions) || instructions.length === 0) return null;
      return { instructions, signature: JSON.stringify([body.edits?.version ?? null, instructions]) };
    })
    .catch((error) => {
      warn("could not load edits", error);
      return undefined;
    })
    .finally(() => inFlight.delete(slug));

  inFlight.set(slug, promise);
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

    let cancelled = false;
    let undo: (() => void) | null = null;
    let applied: string | null = null; // signature of the edits currently in the DOM
    let frame = 0;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let poll: ReturnType<typeof setTimeout> | undefined;

    // `editedSlugs` is baked into the (possibly stale, statically built) HTML,
    // so it only drives anti-flicker. Whether edits exist is always asked of
    // /api/cms/page-edits, which checks the live B1 list server-side.
    // Runs before paint on client navigations; on hard loads the inline
    // <head> script has already hidden <main>.
    if (antiFlicker && edited.has(slug)) hide();
    const revealTimer = setTimeout(reveal, MAX_HIDE_MS);

    const clear = () => {
      undo?.();
      undo = null;
      applied = null;
    };

    const applyWhenReady = (edits: NonNullable<Edits>, attempt: number) => {
      cancelAnimationFrame(frame);
      clearTimeout(retry);
      frame = requestAnimationFrame(() => {
        if (cancelled) return;
        if (!anyPlainSelectorResolves(edits.instructions) && attempt < DOM_WAIT_ATTEMPTS) {
          // Route DOM may still be streaming in; try again shortly.
          retry = setTimeout(() => applyWhenReady(edits, attempt + 1), DOM_WAIT_INTERVAL_MS);
          return;
        }
        // Swap edits: restore the original DOM, then apply the new version.
        clear();
        try {
          undo = applyPageEdits(edits.instructions).undo;
          applied = edits.signature;
        } catch (error) {
          warn("failed to apply edits", error);
        }
        reveal();
      });
    };

    const sync = async () => {
      clearTimeout(poll);
      const edits = await fetchEdits(slug);
      if (cancelled) return;
      if (edits === undefined) {
        // Network/server error: keep whatever is on screen.
        reveal();
      } else if (edits === null) {
        clear();
        reveal();
      } else if (edits.signature !== applied) {
        applyWhenReady(edits, 0);
      }
      schedule();
    };

    const schedule = () => {
      clearTimeout(poll);
      if (cancelled || document.visibilityState !== "visible") return;
      poll = setTimeout(sync, LIVE_POLL_MS);
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") void sync();
      else clearTimeout(poll);
    };

    void sync();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
      cancelAnimationFrame(frame);
      clearTimeout(retry);
      clearTimeout(poll);
      clearTimeout(revealTimer);
      // Restore moved/hidden/edited nodes before React touches them.
      clear();
      reveal();
    };
  }, [pathname, edited, antiFlicker]);

  return null;
}
