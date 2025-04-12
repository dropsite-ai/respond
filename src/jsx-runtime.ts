declare global {
  namespace JSX {
    // We’re using string as our final Element type.
    type Element = string;
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const voidTags = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img',
  'input', 'link', 'meta', 'source', 'track', 'wbr'
]);

/**
 * Converts JSX prop names into the desired HTML attributes.
 * - Converts className → class.
 * - For props starting with "x", it converts, for example:
 *     xData   → x-data
 *     xClass  → :class   (bindings)
 *     xClick  → @click   (events)
 */
function convertAttr(key: string): string {
  if (key === 'className') return 'class';
  if (!key.startsWith('x')) return key;

  const raw = key.slice(1);
  const lowerFirst = raw.charAt(0).toLowerCase() + raw.slice(1);
  const kebab = lowerFirst.replace(/[A-Z]/g, m => '-' + m.toLowerCase());

  // Direct x-attributes
  const directXAttrs = new Set([
    'data', 'init', 'show', 'text', 'html', 'if', 'for', 'key',
    'id', 'cloak', 'ref', 'effect', 'ignore'
  ]);
  if (directXAttrs.has(kebab)) {
    return `x-${kebab}`;
  }

  // Bindings
  const bindingAttrs = new Set([
    'model', 'bind', 'class', 'style', 'value', 'checked', 'disabled'
  ]);
  if (bindingAttrs.has(kebab)) {
    return `:${kebab}`;
  }

  // Special-case for nested `x-bind:foo` as xBindFoo
  if (kebab.startsWith('bind:')) {
    return `x-${kebab}`;
  }

  // Event handlers
  return `@${kebab}`;
}

export function jsx(
  tag: any,
  props: Record<string, any> = {},
  _key?: any
): string {
  if (tag === Fragment || (typeof tag === 'function' && tag.name === 'Fragment')) {
    const children = props.children;
    return Array.isArray(children) ? children.join('') : (children ?? '');
  }

  const children = props.children;
  const inner = Array.isArray(children) ? children.join('') : (children ?? '');
  const rawHtml = props.dangerouslySetInnerHTML?.__html;

  const attrs = Object.entries(props)
    .filter(([k]) => k !== 'children' && k !== 'dangerouslySetInnerHTML')
    .map(([k, v]) => {
      const attr = convertAttr(k);
      if (v === true) return ` ${attr}`;
      if (v === false || v == null) return '';
      return ` ${attr}="${String(v).replace(/"/g, '&quot;')}"`;
    })
    .join('');

  if (voidTags.has(tag)) return `<${tag}${attrs}>`;
  return `<${tag}${attrs}>${rawHtml ?? inner}</${tag}>`;
}

export const jsxs = jsx;

export function Fragment(props: { children?: any }): string {
  return Array.isArray(props.children)
    ? props.children.join('')
    : props.children ?? '';
}
