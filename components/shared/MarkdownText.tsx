// app/components/shared/MarkdownText.tsx
// Renders a short Markdown string (e.g. a FAQ answer) as HTML. Strings without
// Markdown syntax render verbatim inside a single <p>, exactly as plain text
// did before. react-markdown escapes raw HTML and strips unsafe URLs
// (javascript:, data:, …) by default, so the output is safe.
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { hasMarkdownSyntax } from "@/lib/markdown";

const DEFAULT_LINK_CLASS =
  "text-primary underline underline-offset-4 decoration-primary/40 transition-colors hover:text-white";

export function MarkdownText({
  text,
  className,
  linkClassName = DEFAULT_LINK_CLASS,
}: {
  text: string;
  /** Applied to each paragraph (and list) so typography matches the old <p>. */
  className?: string;
  linkClassName?: string;
}) {
  const value = String(text ?? "").trim();
  if (!value) return null;

  if (!hasMarkdownSyntax(value)) {
    return <p className={className}>{value}</p>;
  }

  const components: Components = {
    p: ({ children }) => <p className={`${className ?? ""} [&+*]:mt-3`}>{children}</p>,
    ul: ({ children }) => <ul className={`${className ?? ""} list-disc space-y-1 pl-5 [&+*]:mt-3`}>{children}</ul>,
    ol: ({ children }) => <ol className={`${className ?? ""} list-decimal space-y-1 pl-5 [&+*]:mt-3`}>{children}</ol>,
    strong: ({ children }) => <strong className="font-semibold text-white/80">{children}</strong>,
    code: ({ children }) => (
      <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.9em]">{children}</code>
    ),
    // Headings inside short answers are demoted to bold text so the page
    // heading hierarchy stays intact.
    h1: ({ children }) => <p className={`${className ?? ""} font-semibold`}>{children}</p>,
    h2: ({ children }) => <p className={`${className ?? ""} font-semibold`}>{children}</p>,
    h3: ({ children }) => <p className={`${className ?? ""} font-semibold`}>{children}</p>,
    h4: ({ children }) => <p className={`${className ?? ""} font-semibold`}>{children}</p>,
    h5: ({ children }) => <p className={`${className ?? ""} font-semibold`}>{children}</p>,
    h6: ({ children }) => <p className={`${className ?? ""} font-semibold`}>{children}</p>,
    a: ({ href, children }) => {
      if (!href) return <>{children}</>;
      if (href.startsWith("/")) {
        return (
          <Link href={href} className={linkClassName}>
            {children}
          </Link>
        );
      }
      if (href.startsWith("#")) {
        return (
          <a href={href} className={linkClassName}>
            {children}
          </a>
        );
      }
      return (
        <a href={href} className={linkClassName} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {value}
    </ReactMarkdown>
  );
}
