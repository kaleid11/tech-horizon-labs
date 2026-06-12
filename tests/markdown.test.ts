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

  it("numbers items inside an ordered list", () => {
    const html = "<main><ol><li>Step one</li><li>Step two</li><li>Step three</li></ol></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("1. Step one");
    expect(md).toContain("2. Step two");
    expect(md).toContain("3. Step three");
    expect(md).not.toContain("- Step one");
  });

  it("keeps unordered items as bullets even alongside an ordered list", () => {
    const html =
      "<main><ul><li>Alpha</li><li>Beta</li></ul><ol><li>One</li><li>Two</li></ol></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("- Alpha");
    expect(md).toContain("- Beta");
    expect(md).toContain("1. One");
    expect(md).toContain("2. Two");
  });

  it("indents a nested unordered list under its parent item", () => {
    const html =
      "<main><ul><li>Parent<ul><li>Child A</li><li>Child B</li></ul></li><li>Sibling</li></ul></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("- Parent");
    expect(md).toContain("  - Child A");
    expect(md).toContain("  - Child B");
    expect(md).toContain("- Sibling");
  });

  it("indents and renumbers a nested ordered list under its parent item", () => {
    const html =
      "<main><ol><li>First<ol><li>Sub one</li><li>Sub two</li></ol></li><li>Second</li></ol></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("1. First");
    expect(md).toContain("  1. Sub one");
    expect(md).toContain("  2. Sub two");
    expect(md).toContain("2. Second");
  });

  it("restarts numbering for each separate ordered list", () => {
    const html =
      "<main><ol><li>A</li><li>B</li></ol><p>Break</p><ol><li>C</li><li>D</li></ol></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("1. A");
    expect(md).toContain("2. B");
    expect(md).toContain("1. C");
    expect(md).toContain("2. D");
  });

  it("starts numbering at the ol start attribute", () => {
    const html =
      '<main><ol start="5"><li>Step five</li><li>Step six</li><li>Step seven</li></ol></main>';
    const md = htmlToMarkdown(html);
    expect(md).toContain("5. Step five");
    expect(md).toContain("6. Step six");
    expect(md).toContain("7. Step seven");
    expect(md).not.toContain("1. Step five");
  });

  it("honours a single-quoted start attribute", () => {
    const html = "<main><ol start='3'><li>Three</li><li>Four</li></ol></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("3. Three");
    expect(md).toContain("4. Four");
  });

  it("overrides the running counter from a li value attribute onward", () => {
    const html =
      '<main><ol><li>One</li><li value="10">Ten</li><li>Eleven</li></ol></main>';
    const md = htmlToMarkdown(html);
    expect(md).toContain("1. One");
    expect(md).toContain("10. Ten");
    expect(md).toContain("11. Eleven");
    expect(md).not.toContain("2. Eleven");
  });

  it("combines a start attribute with a later value override", () => {
    const html =
      '<main><ol start="5"><li>Five</li><li>Six</li><li value="20">Twenty</li><li>Twenty-one</li></ol></main>';
    const md = htmlToMarkdown(html);
    expect(md).toContain("5. Five");
    expect(md).toContain("6. Six");
    expect(md).toContain("20. Twenty");
    expect(md).toContain("21. Twenty-one");
  });

  it("ignores start and value attributes on unordered lists", () => {
    const html =
      '<main><ul start="5"><li value="9">Alpha</li><li>Beta</li></ul></main>';
    const md = htmlToMarkdown(html);
    expect(md).toContain("- Alpha");
    expect(md).toContain("- Beta");
    expect(md).not.toContain("5.");
    expect(md).not.toContain("9.");
  });

  it("preserves links inside ordered list items", () => {
    const html =
      '<main><ol><li>See <a href="https://example.com">the docs</a></li></ol></main>';
    const md = htmlToMarkdown(html);
    expect(md).toContain("1. See [the docs](https://example.com)");
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

  it("converts a table into a markdown table with header and separator rows", () => {
    const html = `
      <main>
        <table>
          <thead>
            <tr><th>Company</th><th>Funding</th></tr>
          </thead>
          <tbody>
            <tr><td>OpenAI</td><td>$13B</td></tr>
            <tr><td>Anthropic</td><td>$7B</td></tr>
          </tbody>
        </table>
      </main>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain("| Company | Funding |");
    expect(md).toContain("| --- | --- |");
    expect(md).toContain("| OpenAI | $13B |");
    expect(md).toContain("| Anthropic | $7B |");
  });

  it("pads short rows so every table row has the same column count", () => {
    const html = `
      <main>
        <table>
          <tr><th>A</th><th>B</th><th>C</th></tr>
          <tr><td>1</td><td>2</td></tr>
        </table>
      </main>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain("| A | B | C |");
    expect(md).toContain("| --- | --- | --- |");
    expect(md).toContain("| 1 | 2 | |");
  });

  it("escapes pipe characters inside table cells", () => {
    const html = "<main><table><tr><th>Key</th></tr><tr><td>a|b</td></tr></table></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("| a\\|b |");
  });

  it("strips inline tags and decodes entities inside table cells", () => {
    const html =
      '<main><table><tr><th>Name</th></tr><tr><td>Tech &amp; <strong>Co</strong></td></tr></table></main>';
    const md = htmlToMarkdown(html);
    expect(md).toContain("| Tech & Co |");
  });

  it("converts a blockquote into > prefixed lines", () => {
    const html = "<main><blockquote><p>Infrastructure before automation.</p></blockquote></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("> Infrastructure before automation.");
  });

  it("prefixes each line of a multi-paragraph blockquote", () => {
    const html =
      "<main><blockquote><p>First line.</p><p>Second line.</p></blockquote></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("> First line.");
    expect(md).toContain("> Second line.");
  });

  it("treats <br> inside a blockquote as a new quoted line", () => {
    const html = "<main><blockquote>One<br>Two</blockquote></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("> One");
    expect(md).toContain("> Two");
  });

  it("wraps a <pre><code> block in a fenced code block preserving line breaks", () => {
    const html =
      "<main><pre><code>function add(a, b) {\n  return a + b;\n}</code></pre></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("```\nfunction add(a, b) {\n  return a + b;\n}\n```");
  });

  it("preserves indentation inside a <pre> block", () => {
    const html =
      "<main><pre>line one\n    indented two\n        deeper three</pre></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("```\nline one\n    indented two\n        deeper three\n```");
  });

  it("preserves internal blank lines inside a <pre> block", () => {
    const html = "<main><pre>first\n\n\nlast</pre></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("```\nfirst\n\n\nlast\n```");
  });

  it("decodes HTML entities inside a <pre> block", () => {
    const html = "<main><pre><code>if (a &lt; b &amp;&amp; b &gt; c) {}</code></pre></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("```\nif (a < b && b > c) {}\n```");
  });

  it("renders inline <code> with backticks", () => {
    const html = "<main><p>Run <code>npm install</code> first.</p></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("Run `npm install` first.");
  });

  it("keeps inline <code> backticks inside list items and headings", () => {
    const html =
      "<main><h2>The <code>build</code> step</h2><ul><li>Use <code>db:push</code></li></ul></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("## The `build` step");
    expect(md).toContain("- Use `db:push`");
  });

  it("converts <br> inside a <pre> block into newlines", () => {
    const html = "<main><pre>alpha<br>beta<br>gamma</pre></main>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("```\nalpha\nbeta\ngamma\n```");
  });
});
