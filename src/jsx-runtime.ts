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

  // Remove the leading "x" and lowercase the first letter.
  const raw = key.slice(1);
  const lowerFirst = raw.charAt(0).toLowerCase() + raw.slice(1);
  // Convert any remaining uppercase letters to -lowercase.
  const kebab = lowerFirst.replace(/[A-Z]/g, m => '-' + m.toLowerCase());

  if ([
    'data', 'init', 'model', 'show', 'text', 'html',
    'if', 'for', 'key'
  ].includes(kebab)) {
    return `x-${kebab}`;
  }

  if (['class', 'style', 'value', 'checked', 'disabled'].includes(kebab)) {
    return `:${kebab}`;
  }

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
