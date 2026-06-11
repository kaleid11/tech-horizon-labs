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

  // List items.
  s = s.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_m, inner) => `\n- ${stripInline(inner)}`);

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

  if (title && !s.startsWith("# ")) {
    s = `# ${title}\n\n${s}`;
  }

  return s + "\n";
}
