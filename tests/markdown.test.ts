import { describe, it, expect } from "vitest";
import { htmlToMarkdown, extractTitle } from "../server/markdown";

describe("extractTitle", () => {
  it("prefers the <title> tag", () => {
    const html = "<html><head><title>Page Title</title></head><body><h1>Heading</h1></body></html>";
    expect(extractTitle(html)).toBe("Page Title");
  });

  it("falls back to the first <h1> when there is no <title>", () => {
    const html = "<html><body><h1>Fallback Heading</h1><h1>Second</h1></body></html>";
    expect(extractTitle(html)).toBe("Fallback Heading");
  });

  it("decodes HTML entities and collapses whitespace in the title", () => {
    const html = "<title>Tech &amp; Horizon   Labs</title>";
    expect(extractTitle(html)).toBe("Tech & Horizon Labs");
  });

  it("strips inline tags inside the title", () => {
    const html = "<title>Hello <span>World</span></title>";
    expect(extractTitle(html)).toBe("Hello World");
  });

  it("ignores an empty <title> and falls back to <h1>", () => {
    const html = "<title>   </title><h1>Real Title</h1>";
    expect(extractTitle(html)).toBe("Real Title");
  });

  it("returns undefined when neither <title> nor <h1> is present", () => {
    expect(extractTitle("<body><p>No title here</p></body>")).toBeUndefined();
  });
});

describe("htmlToMarkdown", () => {
  it("converts headings into markdown # levels", () => {
    const html = "<main><h1>Title</h1><h2>Sub</h2><h3>Deeper</h3></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("# Title");
    expect(md).toContain("## Sub");
    expect(md).toContain("### Deeper");
  });

  it("preserves links as [text](href)", () => {
    const html = '<main><p>Visit <a href="https://example.com">our site</a> today.</p></main>';
    const md = htmlToMarkdown(html);
    expect(md).toContain("[our site](https://example.com)");
  });

  it("drops links that have no visible text", () => {
    const html = '<main><p>Before<a href="/empty"></a>After</p></main>';
    const md = htmlToMarkdown(html);
    expect(md).not.toContain("(/empty)");
  });

  it("strips navigation, footer, header, and form regions", () => {
    const html = `
      <body>
        <header><p>Header text</p></header>
        <nav><a href="/home">Home Nav</a></nav>
        <main><p>Real content</p></main>
        <form><input name="email" /><label>Email me</label></form>
        <footer><p>Footer text</p></footer>
      </body>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain("Real content");
    expect(md).not.toContain("Header text");
    expect(md).not.toContain("Home Nav");
    expect(md).not.toContain("Email me");
    expect(md).not.toContain("Footer text");
  });

  it("strips script, style, noscript, and svg content", () => {
    const html = `
      <main>
        <script>console.log("secret")</script>
        <style>.a{color:red}</style>
        <noscript>Enable JS</noscript>
        <svg><path d="M0 0"></path></svg>
        <p>Visible body</p>
      </main>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain("Visible body");
    expect(md).not.toContain("secret");
    expect(md).not.toContain("color:red");
    expect(md).not.toContain("Enable JS");
    expect(md).not.toContain("M0 0");
  });

  it("converts list items into markdown bullets", () => {
    const html = "<main><ul><li>First</li><li>Second</li></ul></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("- First");
    expect(md).toContain("- Second");
  });

  it("decodes HTML entities in body content", () => {
    const html = "<main><p>Tech &amp; Co &mdash; &copy;2026 &#39;quoted&#39;</p></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("Tech & Co — ©2026 'quoted'");
  });

  it("prepends the title as an H1 when content has no leading heading", () => {
    const html = "<main><p>Just a paragraph.</p></main>";
    const md = htmlToMarkdown(html, "My Page");
    expect(md.startsWith("# My Page")).toBe(true);
  });

  it("does not prepend the title when content already starts with a heading", () => {
    const html = "<main><h1>Existing Heading</h1><p>Body.</p></main>";
    const md = htmlToMarkdown(html, "My Page");
    expect(md.startsWith("# Existing Heading")).toBe(true);
    expect(md).not.toContain("# My Page");
  });

  it("prefers <main> content over the rest of the document", () => {
    const html = `
      <body>
        <p>Outside main</p>
        <main><p>Inside main</p></main>
      </body>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain("Inside main");
    expect(md).not.toContain("Outside main");
  });

  it("falls back to <body> when there is no <main>", () => {
    const html = "<html><head><title>T</title></head><body><p>Body content</p></body></html>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("Body content");
  });

  it("converts <br> into newlines", () => {
    const html = "<main><p>Line one<br>Line two</p></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("Line one\nLine two");
  });

  it("collapses excess blank lines and ends with a single trailing newline", () => {
    const html = "<main><h1>Title</h1><p>Para</p></main>";
    const md = htmlToMarkdown(html);
    expect(md.endsWith("\n")).toBe(true);
    expect(md).not.toMatch(/\n{3,}/);
  });

  it("removes any remaining HTML tags from the output", () => {
    const html = "<main><p>Bold <strong>text</strong> here</p></main>";
    const md = htmlToMarkdown(html);
    expect(md).not.toMatch(/<[^>]+>/);
    expect(md).toContain("Bold text here");
  });
});
