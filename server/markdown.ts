/**
 * Lightweight, dependency-free HTML → Markdown conversion.
 *
 * Shared by the build step (pre-generates a `.md` sibling for every page) and
 * the server (runtime fallback + content negotiation when a client requests
 * `Accept: text/markdown`). The output is a clean, readable markdown view of a
 * page's main content — navigation, footer, forms, scripts, and styles stripped.
 */

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
  "&rsquo;": "\u2019",
  "&lsquo;": "\u2018",
  "&ldquo;": "\u201C",
  "&rdquo;": "\u201D",
  "&copy;": "©",
  "&trade;": "™",
  "&reg;": "®",
};

function decodeEntities(input: string): string {
  let s = input;
  for (const [name, value] of Object.entries(ENTITIES)) {
    s = s.split(name).join(value);
  }
  s = s.replace(/&#(\d+);/g, (_m, n) => {
    try {
      return String.fromCodePoint(parseInt(n, 10));
    } catch {
      return _m;
    }
  });
  s = s.replace(/&#x([0-9a-fA-F]+);/g, (_m, n) => {
    try {
      return String.fromCodePoint(parseInt(n, 16));
    } catch {
      return _m;
    }
  });
  return s;
}

/** Strip tags from an inline fragment and collapse whitespace. */
function stripInline(input: string): string {
  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Convert a single `<table>` fragment into a GitHub-flavoured markdown table.
 * The first row becomes the header (with a `---` separator row beneath it);
 * remaining rows form the body. Returns "" when no rows can be parsed.
 */
function tableToMarkdown(tableHtml: string): string {
  const rowMatches = tableHtml.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi);
  if (!rowMatches) return "";

  const rows: string[][] = [];
  for (const row of rowMatches) {
    const cellMatches = row.match(/<(t[hd])\b[^>]*>([\s\S]*?)<\/\1>/gi);
    if (!cellMatches) continue;
    const cells = cellMatches.map((cell) =>
      stripInline(cell.replace(/^<t[hd]\b[^>]*>/i, "").replace(/<\/t[hd]>$/i, ""))
        .replace(/\|/g, "\\|"),
    );
    rows.push(cells);
  }
  if (rows.length === 0) return "";

  const colCount = Math.max(...rows.map((r) => r.length));
  const pad = (r: string[]) => {
    const copy = r.slice();
    while (copy.length < colCount) copy.push("");
    return copy;
  };

  const header = pad(rows[0]);
  const lines: string[] = [];
  lines.push(`| ${header.join(" | ")} |`);
  lines.push(`| ${header.map(() => "---").join(" | ")} |`);
  for (const row of rows.slice(1)) {
    lines.push(`| ${pad(row).join(" | ")} |`);
  }
  return `\n\n${lines.join("\n")}\n\n`;
}

/**
 * Convert a single `<blockquote>` fragment into markdown, prefixing each line
 * with `> `. Inner `<p>` and `<br>` boundaries become separate quoted lines.
 */
function blockquoteToMarkdown(inner: string): string {
  const withBreaks = inner.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n");
  const lines = withBreaks
    .replace(/<[^>]+>/g, " ")
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return "";
  return `\n\n${lines.map((l) => `> ${l}`).join("\n")}\n\n`;
}

/**
 * Convert a single `<ul>`/`<ol>` fragment into markdown list lines.
 *
 * Ordered lists number their items (`1.`, `2.`, …); unordered lists use `-`.
 * Ordered lists honour the HTML `start` attribute on the `<ol>` (numbering
 * begins at that value) and the `value` attribute on individual `<li>`s (which
 * resets the running counter from that item onward), so sequences that continue
 * across sections keep their real step numbers. Already-rendered nested lists
 * arrive inside an item as sentinel-prefixed lines (see {@link convertLists});
 * they are pushed one indent level deeper.
 *
 * Two control characters guard the output through the later whitespace-
 * collapsing passes: `\x00` marks the start of every list line (so leading
 * indentation is not eaten), and `\x01` encodes a single indent level (so it
 * is not collapsed by the multi-space → single-space cleanup). Both are
 * resolved to real spaces at the very end of {@link htmlToMarkdown}.
 */
function listToMarkdown(tag: string, attrs: string, inner: string): string {
  const ordered = tag.toLowerCase() === "ol";
  const items: string[] = [];
  const liRe = /<li\b([^>]*)>([\s\S]*?)<\/li>/gi;
  let m: RegExpExecArray | null;
  let counter = 1;
  if (ordered) {
    const startMatch = attrs.match(/\bstart\s*=\s*["']?(-?\d+)/i);
    if (startMatch) counter = parseInt(startMatch[1], 10);
  }
  while ((m = liRe.exec(inner)) !== null) {
    const liAttrs = m[1];
    const content = m[2];
    if (ordered) {
      const valueMatch = liAttrs.match(/\bvalue\s*=\s*["']?(-?\d+)/i);
      if (valueMatch) counter = parseInt(valueMatch[1], 10);
    }
    const sentinelIdx = content.indexOf("\x00");
    let own: string;
    let rest: string;
    if (sentinelIdx === -1) {
      own = stripInline(content);
      rest = "";
    } else {
      own = stripInline(content.slice(0, sentinelIdx));
      // Indent every nested line one level deeper.
      rest = content.slice(sentinelIdx).replace(/\x00/g, "\x00\x01");
    }
    const marker = ordered ? `${counter}.` : "-";
    items.push(`\n\x00${marker} ${own}${rest}`);
    if (ordered) counter += 1;
  }
  return `\n${items.join("")}\n`;
}

/**
 * Convert all `<ul>`/`<ol>` blocks into markdown, innermost first so nested
 * lists are rendered before their parents consume them. The regex only matches
 * lists that contain no further list openings, guaranteeing the innermost is
 * picked each pass; every successful replacement removes one list, so the loop
 * terminates. Malformed (unclosed) lists are left for the generic tag stripper.
 */
function convertLists(s: string): string {
  const innermost = /<(ul|ol)\b([^>]*)>((?:(?!<(?:ul|ol)\b)[\s\S])*?)<\/\1>/i;
  let match: RegExpMatchArray | null;
  while ((match = s.match(innermost)) !== null) {
    const full = match[0];
    const tag = match[1];
    const attrs = match[2];
    const body = match[3];
    const at = match.index ?? 0;
    s = s.slice(0, at) + listToMarkdown(tag, attrs, body) + s.slice(at + full.length);
  }
  return s;
}

/** Best-effort page title from <title>, falling back to the first <h1>. */
export function extractTitle(html: string): string | undefined {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (title) {
    const t = decodeEntities(stripInline(title[1])).trim();
    if (t) return t;
  }
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) {
    const t = decodeEntities(stripInline(h1[1])).trim();
    if (t) return t;
  }
  return undefined;
}

/**
 * Convert a full HTML document into clean markdown. When `title` is supplied
 * and the body does not already start with a heading, it is prepended as an H1.
 */
export function htmlToMarkdown(html: string, title?: string): string {
  let s = html;

  // Prefer <main>, then <body>, then the whole document.
  const main = s.match(/<main[\s\S]*?<\/main>/i);
  if (main) {
    s = main[0];
  } else {
    const body = s.match(/<body[\s\S]*?<\/body>/i);
    if (body) s = body[0];
  }

  // Drop non-content regions entirely.
  s = s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<form[\s\S]*?<\/form>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");

  // Code blocks (<pre>) → fenced ``` blocks. Extracted to placeholders *before*
  // any other conversion so their original line breaks and indentation survive
  // the whitespace-collapsing pass at the end. Restored after normalisation.
  const codeBlocks: string[] = [];
  s = s.replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi, (_m, inner) => {
    let code = inner
      .replace(/<\/?code\b[^>]*>/gi, "") // unwrap an inner <code>
      .replace(/<br\s*\/?>/gi, "\n") // <br> inside code → newline
      .replace(/<[^>]+>/g, ""); // drop any remaining tags
    code = decodeEntities(code);
    // Trim surrounding blank lines but keep internal indentation intact.
    code = code.replace(/^\n+/, "").replace(/[ \t]*\n+$/, "").replace(/\s+$/, "");
    const placeholder = `\u0000CODEBLOCK${codeBlocks.length}\u0000`;
    codeBlocks.push("```\n" + code + "\n```");
    return `\n\n${placeholder}\n\n`;
  });

  // Inline <code> → `backticks` (kept before stripInline-style passes so the
  // backticks survive tag stripping).
  s = s.replace(
    /<code\b[^>]*>([\s\S]*?)<\/code>/gi,
    (_m, inner) => `\`${stripInline(inner)}\``,
  );

  // Links → [text](href) (done before block conversions so the text survives).
  s = s.replace(
    /<a\b[^>]*\bhref=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (_m, href, text) => {
      const t = stripInline(text);
      return t ? `[${t}](${href})` : "";
    },
  );

  // Tables → markdown tables (before generic block conversion flattens them).
  s = s.replace(/<table\b[^>]*>[\s\S]*?<\/table>/gi, (m) => tableToMarkdown(m));

  // Blockquotes → `> ` prefixed lines.
  s = s.replace(
    /<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi,
    (_m, inner) => blockquoteToMarkdown(inner),
  );

  // Headings.
  for (let i = 1; i <= 6; i++) {
    const re = new RegExp(`<h${i}\\b[^>]*>([\\s\\S]*?)<\\/h${i}>`, "gi");
    s = s.replace(re, (_m, inner) => `\n\n${"#".repeat(i)} ${stripInline(inner)}\n\n`);
  }

  // Lists: ordered (1. 2. …) and unordered (- ), with nested indentation.
  s = convertLists(s);

  // Line breaks and block boundaries.
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/(p|div|section|article|ul|ol|tr|table|blockquote)>/gi, "\n\n");

  // Strip whatever remains.
  s = s.replace(/<[^>]+>/g, " ");

  s = decodeEntities(s);

  s = s
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Resolve list sentinels: each \x01 is one indent level, \x00 marked the
  // start of a list line (its guard role is now done).
  s = s.replace(/\x01/g, "  ").replace(/\x00/g, "");

  if (title && !s.startsWith("# ")) {
    s = `# ${title}\n\n${s}`;
  }

  // Restore fenced code blocks *after* whitespace normalisation so their
  // indentation and internal blank lines are not collapsed.
  for (let i = 0; i < codeBlocks.length; i++) {
    s = s.replace(`\u0000CODEBLOCK${i}\u0000`, () => codeBlocks[i]);
  }

  return s + "\n";
}
