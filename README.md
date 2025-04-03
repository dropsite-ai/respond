# respond

> A tiny, universal JSX-to-HTML string renderer — with optional Alpine.js support.

`respond` lets you write HTML in JSX and render it to raw strings — no DOM, no React, no dependencies. You can use it on the server or client, and even pair it with [Alpine.js](https://alpinejs.dev/) for lightweight interactivity.

---

## ✨ Features

- ✅ Renders JSX to HTML strings
- ✅ Works on server or client
- ✅ Fragments (`<>...</>`) supported
- ✅ Outputs real HTML, not virtual DOM
- ✅ Alpine.js-friendly via `clientAlpineRender`
- ✅ Zero runtime dependencies

---

## 🚀 Install

```bash
npm install @dropsite-ai/respond
```

---

## 📦 Basic Usage

### Enable JSX with a custom factory

In your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@dropsite-ai/respond"
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

## ⚡ Alpine.js Integration (optional)

If you're using Alpine.js on the frontend, use the `clientAlpineRender` helper to inject JSX-rendered HTML and activate Alpine:

```tsx
import { clientAlpineRender } from '@dropsite-ai/respond';

const html = (
  <div x-data="{ count: 0 }">
    <button x-on:click="count++">+</button>
    <span x-text="count"></span>
  </div>
);

const el = document.getElementById('app')!;
clientAlpineRender(el, html);
```

By default, `clientAlpineRender` will:
- Set `innerHTML` on the element
- Call `Alpine.initTree()` using the global `window.Alpine`

> 💡 You must load Alpine yourself (`@types/alpinejs` is included for type safety only).

---

## 📚 API

### JSX Runtime Exports

- `jsx(tag, props)` – JSX handler for elements with 1 child
- `jsxs(tag, props)` – JSX handler for multiple children
- `jsxDEV(tag, props)` – dev version (same as `jsx`)
- `Fragment` – inlines children with no wrapping tag

### Utility

- `clientAlpineRender(el, html)` – injects and activates Alpine on a given DOM node

---

## 🛡 Gotchas

- Use `class`, not `className`
- Dynamic content is **not sanitized** — escape it if needed
- You’re responsible for managing interactivity (Alpine, events, etc.)

---

## 🪶 When to Use This

Perfect for:

- Static HTML templates
- SSR output
- Markdown + JSX rendering
- Emails and documentation
- Lightweight SPA views with Alpine.js

---

## 📝 License

MIT