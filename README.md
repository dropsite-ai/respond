# respond

> A tiny, type-safe HTML template tag for rendering HTML strings — with built-in escaping, raw injection, and smart whitespace control.

`respond` lets you write real HTML in tagged template literals. It escapes interpolated values by default, lets you safely inject raw HTML when needed, and works in any JavaScript or TypeScript environment — no JSX, no dependencies, no runtime overhead.

---

## ✨ Features

- ✅ Write HTML using template literals with syntax highlighting
- ✅ Escapes interpolated values automatically (XSS-safe)
- ✅ Use `raw()` to inject unescaped HTML
- ✅ Smart whitespace collapsing for readable output
- ✅ Supports arrays, nulls, and mixed content
- ✅ Fully runtime-agnostic: works in Node, browsers, and edge runtimes
- ✅ Zero dependencies, zero magic

---

## 🚀 Install

```bash
npm install @dropsite/respond
```

---

## 📦 Basic Usage

```ts
import { html } from '@dropsite/respond';

const name = 'Winton';

const markup = html/*html*/`
  <div class="user">
    Hello, ${name}!
  </div>
`;

console.log(markup);
// => <div class="user"> Hello, Winton! </div>
```

---

## 🔒 Automatic Escaping

Interpolated values are automatically HTML-escaped to prevent injection:

```ts
const unsafe = '<script>alert("xss")</script>';

const markup = html/*html*/`<div>${unsafe}</div>`;
// => <div>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</div>
```

---

## 🧠 Inject Raw HTML with `raw()`

Use the `raw()` helper to explicitly insert unescaped HTML:

```ts
import { html, raw } from '@dropsite/respond';

const markup = html/*html*/`
  <div>
    ${raw('<span class="highlight">raw html</span>')}
  </div>
`;

// => <div><span class="highlight">raw html</span></div>
```

---

## 🧹 Whitespace Collapsing

Multiline HTML templates are cleaned up automatically:

```ts
const markup = html/*html*/`
  <section>
    <h1>Title</h1>

    <p>Description</p>
  </section>
`;

// => <section> <h1>Title</h1> <p>Description</p> </section>
```

- Single-line literals are left untouched
- Whitespace inside interpolated values is preserved unless you modify it

---

## 🧩 Interpolating Arrays and Mixed Content

You can interpolate arrays of strings, raw HTML, or values:

```ts
const items = [
  raw('<li>One</li>'),
  raw('<li>Two</li>')
];

const markup = html/*html*/`
  <ul>${items}</ul>
`;

// => <ul><li>One</li><li>Two</li></ul>
```

Falsy values like `null` or `undefined` are safely ignored.

---

## 📚 API

### `html(strings, ...values): string`

A tagged template that returns an HTML string.

- Escapes all interpolated values by default
- Accepts arrays, nested values, and raw HTML

### `raw(value): { __html: string }`

Marks a value as raw HTML to skip escaping.

---

## 🪶 Use Cases

Great for:

- Static HTML rendering
- Server-side rendering in edge or server environments
- Safe template construction in Markdown processors
- HTML emails or CMS content previews
- Framework-less UI and documentation generation

---

## 📝 License

MIT