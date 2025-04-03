/// <reference types="vitest" />
/** @jsxImportSource ../src */

import { describe, it, expect } from 'vitest';

describe('JSX to HTML string', () => {
  it('renders a basic element', () => {
    const html = <div class="box">Hello</div>;
    expect(html).toBe('<div class="box">Hello</div>');
  });

  it('renders nested elements', () => {
    const html = (
      <section id="main">
        <h1>Title</h1>
        <p>Paragraph</p>
      </section>
    );
    expect(html).toBe('<section id="main"><h1>Title</h1><p>Paragraph</p></section>');
  });

  it('handles fragments', () => {
    const html = (
      <>
        <b>Bold</b>
        <i>Italic</i>
      </>
    );
    expect(html).toBe('<b>Bold</b><i>Italic</i>');
  });

  it('escapes double quotes in attributes', () => {
    const html = <div title={'Say "hi"'}>Test</div>;
    expect(html).toBe('<div title="Say &quot;hi&quot;">Test</div>');
  });
});
