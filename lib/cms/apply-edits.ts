// B4 — apply edited-page instructions to the rendered DOM, matching the ERP
// editor's algorithm. Returns an `undo` that restores every touched node so
// React/Next can safely unmount or re-render it (B6).

import { CLONE_SELECTOR_PREFIX, isValidCloneId, sanitizeEditStyles } from "./edits";
import type { PageEditInstruction } from "./types";

const INHERIT_TO_DESCENDANTS = new Set(["color", "text-decoration"]);

function isCopySelector(selector: string): boolean {
  return selector.trimStart().startsWith(CLONE_SELECTOR_PREFIX);
}

function query(root: ParentNode, selector: string): HTMLElement | null {
  try {
    const el = root.querySelector(selector);
    return el instanceof HTMLElement ? el : null;
  } catch {
    return null; // Invalid selector.
  }
}

/** True when at least one plain selector matches (used to wait for the route's DOM). */
export function anyPlainSelectorResolves(instructions: PageEditInstruction[], root: ParentNode = document): boolean {
  return instructions.some((ins) => !isCopySelector(ins.selector) && query(root, ins.selector) !== null);
}

export function applyPageEdits(
  instructions: PageEditInstruction[],
  root: ParentNode = document,
): { undo: () => void; applied: number } {
  const undoStack: Array<() => void> = [];
  let applied = 0;

  const rememberStyle = (el: HTMLElement) => {
    const original = el.getAttribute("style");
    undoStack.push(() => {
      if (original === null) el.removeAttribute("style");
      else el.setAttribute("style", original);
    });
  };

  // Pass 1 — resolve every plain selector against the original DOM.
  const elements = new Map<number, HTMLElement | null>();
  const targets = new Map<number, HTMLElement | null>();
  instructions.forEach((ins, i) => {
    if (!isCopySelector(ins.selector)) elements.set(i, query(root, ins.selector));
    if (ins.kind === "move" && !isCopySelector(ins.target)) targets.set(i, query(root, ins.target));
  });

  // Create duplicates, in order.
  instructions.forEach((ins, i) => {
    if (ins.kind !== "duplicate" || !isValidCloneId(ins.id)) return;
    const source = elements.has(i) ? elements.get(i) : query(root, ins.selector);
    if (!source || !source.isConnected) return;

    const clone = source.cloneNode(true) as HTMLElement;
    clone.setAttribute("data-erp-clone", ins.id);
    source.after(clone);
    undoStack.push(() => clone.remove());
    applied++;
  });

  // Pass 2 — resolve copy selectors now that clones exist.
  instructions.forEach((ins, i) => {
    if (isCopySelector(ins.selector)) elements.set(i, query(root, ins.selector));
    if (ins.kind === "move" && isCopySelector(ins.target)) targets.set(i, query(root, ins.target));
  });

  // Element edits, in order.
  instructions.forEach((ins, i) => {
    if (ins.kind !== "edit") return;
    const el = elements.get(i);
    if (!el || !el.isConnected) return;

    if (typeof ins.text === "string") {
      const originalChildren = Array.from(el.childNodes);
      undoStack.push(() => el.replaceChildren(...originalChildren));
      el.textContent = ins.text; // never innerHTML
    }

    const styles = sanitizeEditStyles(ins.styles);
    if (styles) {
      rememberStyle(el);
      for (const [prop, value] of Object.entries(styles)) {
        el.style.setProperty(prop, value, "important");
      }
      const inherited = Object.entries(styles).filter(([prop]) => INHERIT_TO_DESCENDANTS.has(prop));
      if (inherited.length > 0) {
        el.querySelectorAll<HTMLElement>("*").forEach((child) => {
          rememberStyle(child);
          for (const [prop, value] of inherited) child.style.setProperty(prop, value, "important");
        });
      }
    }
    applied++;
  });

  // Moves and removals, in order.
  instructions.forEach((ins, i) => {
    if (ins.kind !== "move" && ins.kind !== "remove") return;
    const el = elements.get(i);
    if (!el || !el.isConnected) return;

    if (ins.kind === "remove") {
      rememberStyle(el);
      // Hide instead of el.remove(): the node may be owned by React.
      el.style.setProperty("display", "none", "important");
      applied++;
      return;
    }

    const target = targets.get(i);
    if (!target || !target.isConnected || target === el || el.contains(target)) return;

    const parent = el.parentNode;
    const nextSibling = el.nextSibling;
    undoStack.push(() => {
      if (!parent || !parent.isConnected) return;
      const anchor = nextSibling && nextSibling.parentNode === parent ? nextSibling : null;
      parent.insertBefore(el, anchor);
    });
    if (ins.position === "after") target.after(el);
    else target.before(el);
    applied++;
  });

  let undone = false;
  return {
    applied,
    undo: () => {
      if (undone) return;
      undone = true;
      for (let i = undoStack.length - 1; i >= 0; i--) {
        try {
          undoStack[i]();
        } catch {
          // Node already gone; nothing to restore.
        }
      }
    },
  };
}
