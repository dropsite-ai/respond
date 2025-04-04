declare global {
  namespace JSX {
    interface IntrinsicElements {
      [tag: string]: any;
    }

    type Element = string;
  }
}

export function jsx(
  tag: any,
  props: Record<string, any>,
  key?: any
): string {
  const children = props?.children
    ? Array.isArray(props.children)
      ? props.children.join('')
      : props.children
    : '';

  // Special handling for Fragment
  if (tag === Fragment) {
    return children;
  }

  const attrs = Object.entries(props || {})
    .filter(([k]) => k !== 'children')
    .map(([k, v]) => ` ${k}="${String(v).replace(/"/g, '&quot;')}"`)
    .join('');

  return `<${tag}${attrs}>${children}</${tag}>`;
}

export const jsxs = jsx;

// Fragment must be declared before jsx to avoid hoisting weirdness
export const Fragment = (props: { children?: any }) =>
  Array.isArray(props.children)
    ? props.children.join('')
    : props.children ?? '';
