// Shared helpers for the Markdown stored in content/*.ts (page bodies and
// structured FAQ answers). Pure string functions — safe on server and client.
//
// The page content was generated from authoring templates that contained
// writer instructions wrapped as "[PLACEHOLDER: …]". Many of those openers were
// later stripped, which left orphaned instructions ending in "]" (e.g.
// "> ** 1–2 verifiable case studies. Required before indexing.]**") that then
// rendered as raw Markdown on the live site. These helpers remove such
// authoring notes at render time so they never reach visitors or JSON-LD.

const FENCE = /^\s*(```|~~~)/;

// "# INDUSTRY 02 — FinTech" / "# SOLUTION 01 — CRM Development" / "# TECH 08 — .NET"
// — an internal catalogue label that precedes the real "# H1" of the page.
const INTERNAL_LABEL_HEADING = /^#\s+[A-Z][A-Z&/ -]*\s\d+\s+[—–-]\s+[^\n]*\n+(?=#\s)/;

function isAuthoringNoteLine(trimmed: string): boolean {
  // A line made only of bracketed notes / button placeholders with no link
  // target, e.g. "[Form] [Calendar embed]", "[Trust bar: [PLACEHOLDER]]",
  // "[LOCAL DATA MODULE — …]", "[Answer honestly per company reality: …]".
  if (/^\[.*\]$/.test(trimmed) && !trimmed.includes("](")) return true;
  // A blockquote note whose "[PLACEHOLDER:" opener was lost:
  // "> ** 1–2 verifiable case studies. Required before indexing.]**".
  // ("** " followed by a space can never open bold in Markdown.)
  if (/^>\s*\*\*\s/.test(trimmed)) return true;
  // A case-study card template row whose "**[" opener was lost:
  // "> - Client, industry]** — [problem → result] → [case study](/case-studies/)".
  if (/^>\s*[-*]\s+[^[\n]*\]\*\*/.test(trimmed)) return true;
  return false;
}

// Unfilled template values: "[PLACEHOLDER range]", "[X%]", "[XX]", "$X/mo",
// "$[XX]K", "[Replace X with real figure.]", "[publish real rate card …]",
// "[40–60% — verify against your real rates]". Never a Markdown link "[..](..)".
// Text inside a non-link bracket "[…]" that marks an unfilled template value.
const PLACEHOLDER_BRACKET_CONTENT =
  /PLACEHOLDER|placeholder|\bX%|^X{1,2}$|replace X|replace with real|publish real|verify against|real figure/i;
// Bracket groups that are not Markdown links ("[text](url)").
const PLAIN_BRACKET = /\[([^[\]]*)\](?!\()/g;
// "$X/mo", "$Y", "$[XX]K", bare "PLACEHOLDER range]".
const PLACEHOLDER_INLINE = /\bPLACEHOLDER\b|\$\[?[XYZ]{1,2}\]?(?=[^A-Za-z0-9]|$)/;

export function hasPlaceholder(text: string): boolean {
  const value = text || "";
  if (PLACEHOLDER_INLINE.test(value)) return true;
  for (const match of value.matchAll(PLAIN_BRACKET)) {
    if (PLACEHOLDER_BRACKET_CONTENT.test(match[1])) return true;
  }
  return false;
}

/**
 * Hides unfilled template values instead of showing them to visitors:
 * - a dash aside "… seniority — [PLACEHOLDER: rate card]." loses only the aside;
 * - any other sentence containing a placeholder is dropped.
 * Once real figures are written into the content, they render normally.
 */
function removePlaceholderSentences(line: string): string {
  if (!hasPlaceholder(line)) return line;
  let result = line.replace(/\s*[—–]\s*\[([^[\]]*)\](?!\()/g, (aside, inner: string) =>
    PLACEHOLDER_BRACKET_CONTENT.test(inner) ? "" : aside,
  );
  if (!hasPlaceholder(result)) return result;
  if (/^\s*\|/.test(result)) return result; // table rows: leave structure alone

  const prefix = result.match(/^\s*(?:>\s*)?(?:[-*+]\s+|\d+\.\s+)?/)?.[0] ?? "";
  const body = result.slice(prefix.length);
  // Sentence boundaries: ". " followed by a capital, "[", "*", or a quote.
  const sentences = body.split(/(?<=[.!?])\s+(?=[A-Z[*"“(])/);
  const kept = sentences.filter((sentence) => !hasPlaceholder(sentence));
  result = kept.length ? `${prefix}${kept.join(" ")}` : "";
  return result.trim() === prefix.trim() ? "" : result;
}

// Repairs emphasis broken by the same lost-opener problem, on one line.
function repairBrokenEmphasis(line: string): string {
  return (
    line
      // "Focused builds: PLACEHOLDER range]**," -> "Focused builds: **[PLACEHOLDER range]**,"
      .replace(/(^|[\s:(])PLACEHOLDER([^[\]\n]*)\]\*\*/g, "$1**[PLACEHOLDER$2]**")
      // "** ├→ API → Backend**" -> "**├→ API → Backend**" (bold cannot start with a space)
      .replace(/^(\s*)\*\*\s+(\S(?:.*\S)?)\s*\*\*\s*$/, "$1**$2**")
  );
}

/**
 * Removes authoring notes left in generated content. Lines inside fenced code
 * blocks are never touched. Real prose that merely has a note appended after
 * a double space ("…the work is done.  2–3 sentences of insight; required
 * before indexing.]") keeps its prose and loses only the note.
 */
export function stripAuthoringNotes(markdown: string): string {
  if (!markdown) return "";
  let inFence = false;
  const out: string[] = [];

  for (const line of markdown.split("\n")) {
    if (FENCE.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    const trimmed = line.trim();
    if (inFence || !trimmed) {
      out.push(line);
      continue;
    }
    if (isAuthoringNoteLine(trimmed)) continue;

    // Orphaned note: ends with "]" (optionally "]**") but has no "[" at all —
    // brackets in real prose are always paired.
    if (/\]\**\s*$/.test(trimmed) && !trimmed.includes("[")) {
      const prose = line.replace(/(\S)\s{2,}[^[\]]*\]\**\s*$/, "$1");
      if (prose !== line) out.push(prose);
      continue;
    }

    const cleaned = removePlaceholderSentences(repairBrokenEmphasis(line));
    if (cleaned.trim()) out.push(cleaned);
  }

  return out.join("\n");
}

/**
 * Restores link openers lost from generated content, line by line:
 *   "- AI where it pays](/services/ai/) — …"  -> "- [AI where it pays](/services/ai/) — …"
 *   "- Shopify](/platforms/shopify/) builds**" -> "- **[Shopify](/platforms/shopify/) builds**"
 * Lines whose links are intact are returned unchanged.
 */
export function repairMissingMarkdownLinkOpeners(text: string): string {
  return (text || "")
    .split("\n")
    .map((line) => {
      const insertions: { index: number; text: string }[] = [];
      const linkPattern = /\]\((?:\/|https?:\/\/)[^)]+\)/g;
      const listMarker = line.match(/^\s*(?:[-*]|\d+\.)\s+/);
      const contentStart = listMarker ? listMarker[0].length : (line.match(/^\s*/)?.[0].length ?? 0);
      let match: RegExpExecArray | null;

      while ((match = linkPattern.exec(line)) !== null) {
        const closingBracket = match.index;
        const previousOpeningBracket = line.lastIndexOf("[", closingBracket);
        const previousClosingBracket = line.lastIndexOf("]", closingBracket - 1);
        if (previousOpeningBracket > previousClosingBracket) continue;

        // Only the first broken link can start at the list marker; later
        // ones start at the preceding word (avoids inserting "[[").
        const labelStart =
          listMarker && insertions.length === 0
            ? contentStart
            : Math.max(
                line.lastIndexOf(" ", closingBracket - 1),
                line.lastIndexOf("\t", closingBracket - 1),
              ) + 1;
        // When the label starts the line/item and the line's "**" are
        // unbalanced with the stray one after the link, "**[" was lost.
        const restoreBold =
          insertions.length === 0 &&
          labelStart === contentStart &&
          (line.match(/\*\*/g) || []).length % 2 === 1 &&
          line.indexOf("**", closingBracket) > closingBracket &&
          !line.slice(0, closingBracket).includes("**");
        insertions.push({ index: labelStart, text: restoreBold ? "**[" : "[" });
      }

      for (const { index, text: insert } of insertions.reverse()) {
        line = `${line.slice(0, index)}${insert}${line.slice(index)}`;
      }
      return line;
    })
    .join("\n");
}

/**
 * react-markdown passes its AST `node` to custom renderers; spreading it onto
 * a DOM element emits an invalid `node="[object Object]"` attribute.
 */
export function omitNode<T extends Record<string, unknown>>(props: T): Omit<T, "node"> {
  const rest = { ...props };
  delete rest.node;
  return rest;
}

/** Drops a leading internal catalogue label heading when a real H1 follows. */
export function stripInternalLabelHeading(markdown: string): string {
  if (!markdown) return "";
  const leading = markdown.match(/^\s*/)?.[0] ?? "";
  const rest = markdown.slice(leading.length);
  return INTERNAL_LABEL_HEADING.test(rest) ? rest.replace(INTERNAL_LABEL_HEADING, "") : markdown;
}

/** Normalizes a page body before any template splits or renders it. */
export function normalizePageMarkdown(markdown: string): string {
  return stripAuthoringNotes(stripInternalLabelHeading(markdown || ""));
}

/** Converts inline Markdown to plain text (meta tags, JSON-LD, hero copy). */
export function markdownToPlainText(markdown: string): string {
  return (markdown || "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\((?:[^()]|\([^)]*\))*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g, "$2")
    .replace(/(^|[^*\w])\*(?=\S)([^*\n]*?\S)\*(?!\*)/g, "$1$2")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export interface MarkdownFaq {
  question: string;
  answer: string;
}

/**
 * Cleans FAQ items for both the visible accordion and the FAQPage JSON-LD,
 * so the two always match. Items whose answer was only an authoring note are
 * dropped (an empty answer is invalid FAQ markup).
 */
export function normalizeFaqs<T extends MarkdownFaq>(faqs: T[] | undefined | null): T[] {
  if (!Array.isArray(faqs)) return [];
  return faqs
    .map((faq) => {
      const rawAnswer = String(faq?.answer ?? "");
      const answer = stripAuthoringNotes(rawAnswer).trim();
      // If hiding placeholders left only a fragment ("Both curves in every
      // quote."), the item no longer answers its question — drop it.
      const gutted = hasPlaceholder(rawAnswer) && markdownToPlainText(answer).length < 40;
      return {
        ...faq,
        question: String(faq?.question ?? "").trim(),
        answer: gutted ? "" : answer,
      };
    })
    .filter((faq) => faq.question && faq.answer && !hasPlaceholder(faq.question));
}

// Syntax that only Markdown would give meaning to. Plain text without any of
// it is rendered verbatim (no Markdown parse), so non-Markdown strings — e.g.
// CMS-provided FAQ answers — render exactly as before.
const MARKDOWN_SYNTAX =
  /\[[^\]\n]+\]\([^)\s]+\)|(\*\*|__)\S|\S(\*\*|__)|(^|\s)\*\S[^*\n]*\*|`[^`\n]+`|^\s{0,3}#{1,6}\s|^\s*[-*+]\s+\S|^\s*\d+\.\s+\S|^\s*>\s|^\s*\|.*\|\s*$/m;

export function hasMarkdownSyntax(text: string): boolean {
  return MARKDOWN_SYNTAX.test(text || "");
}
