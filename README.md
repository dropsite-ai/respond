# respond

> A tiny, universal JSX-to-HTML string renderer — with optional Alpine.js support.

`respond` lets you write HTML in JSX and render it to raw strings — no DOM, no React, no dependencies. You can use it on the server or client, and even pair it with [Alpine.js](https://alpinejs.dev/) for lightweight interactivity.

---

## ✨ Features

- ✅ Renders JSX to HTML strings
- ✅ Works on server or client
- ✅ Fragments (`<>...</>`) supported
- ✅ Outputs real HTML, not virtual DOM
- ✅ Alpine.js-friendly via `x*` prop naming convention
- ✅ Self-closing void tag support
- ✅ `className` → `class` auto-conversion
- ✅ `dangerouslySetInnerHTML` for raw HTML injection
- ✅ Zero runtime dependencies

---

## 🚀 Install

```bash
npm install @dropsite/respond
```

---

## 📦 Basic Usage

### Enable JSX with a custom factory

In your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@dropsite/respond"
  }
}
```

---

### Render HTML in any `.tsx` file

```tsx
const html = (
  <div class="alert">
    Hello <b>world</b>
  </div>
);

console.log(html);
// => <div class="alert">Hello <b>world</b></div>
```

---

## 🧩 Fragments

```tsx
const html = (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);

// => <h1>Title</h1><p>Description</p>
```

---

## ⚡ Alpine.js Support

You can use Alpine.js by prefixing your props with `x`:

```tsx
const html = (
  <div xData="{ count: 0 }" xClick="count++" xClass="count > 0 ? 'active' : 'inactive'">
    <button>+</button>
    <span xText="count"></span>
  </div>
);
```

These convert automatically to valid Alpine attributes.

---

### ✅ Supported `x*` Props

| JSX Prop     | Output Attribute   |
|--------------|--------------------|
| `xData`      | `x-data`           |
| `xInit`      | `x-init`           |
| `xModel`     | `x-model`          |
| `xShow`      | `x-show`           |
| `xText`      | `x-text`           |
| `xHtml`      | `x-html`           |
| `xIf`        | `x-if`             |
| `xFor`       | `x-for`            |
| `xKey`       | `x-key`            |
| `xClass`     | `:class`           |
| `xStyle`     | `:style`           |
| `xValue`     | `:value`           |
| `xChecked`   | `:checked`         |
| `xDisabled`  | `:disabled`        |
| `xClick`     | `@click`           |
| `xSubmit`    | `@submit`          |
| `xInput`     | `@input`           |
| `xChange`    | `@change`          |
| `xKeydown`   | `@keydown`         |
| `xMouseenter`| `@mouseenter`      |
| ...          | `@<event>` (default) |

> ℹ️ Any `x*` prop not explicitly listed will default to `@<event>` — e.g. `xBlur → @blur`.

---

## 🧠 Raw HTML Support

Use `dangerouslySetInnerHTML` to inject raw HTML:

```tsx
const html = <div dangerouslySetInnerHTML={{ __html: '<b>raw</b>' }} />;
// => <div><b>raw</b></div>
```

---

## 🛠 Utility: `xRender`

```tsx
import { xRender } from '@dropsite/respond';

xRender(document.getElementById('app')!, html);
```

- Injects the `html` into the element
- Calls `Alpine.initTree()` if `window.Alpine` is available

---

## 📚 API

### JSX Runtime Exports

- `jsx(tag, props)` – JSX handler for elements with 1 child
- `jsxs(tag, props)` – JSX handler for multiple children
- `jsxDEV(tag, props)` – dev version (same as `jsx`)
- `Fragment` – inline fragment wrapper (`<>...</>`)

### Utility

- `xRender(el, html, AlpineInstance?)` – render + hydrate Alpine markup

---

## 🪶 When to Use This

Perfect for:

- Static HTML templates
- Server-rendered views
- Markdown + JSX rendering
- Emails and documentation
- Lightweight Alpine.js-powered SPAs
- Edge-rendered HTML (e.g., Cloudflare Workers)

---

## 📝 License

MIT