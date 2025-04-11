import type { Alpine } from 'alpinejs';

export function xRender(
  target: HTMLElement,
  html: string,
  AlpineInstance?: Alpine
) {
  target.innerHTML = html;

  const Alpine: Alpine | undefined = AlpineInstance || (window as any).Alpine;
  Alpine?.initTree?.(target);
}
