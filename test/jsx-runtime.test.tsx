/// <reference types="vitest" />
/** @jsxImportSource ../src */

import { describe, it, expect } from 'vitest';

describe('Custom JSX Runtime', () => {
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

  it('renders fragments', () => {
    const html = (
      <>
        <b>Bold</b>
        <i>Italic</i>
      </>
    );
    expect(html).toBe('<b>Bold</b><i>Italic</i>');
  });

  it('escapes quotes in attributes', () => {
    const html = <div title={'Say "hi"'}>Test</div>;
    expect(html).toBe('<div title="Say &quot;hi&quot;">Test</div>');
  });

  it('converts className to class', () => {
    const html = <span className="test">hi</span>;
    expect(html).toBe('<span class="test">hi</span>');
  });

  it('handles Alpine-style props using x prefix', () => {
    const html = (
      <div
        xData="{ count: 0 }"
        xClass="count > 5 ? 'green' : 'red'"
        xClick="count++"
        xInit="console.log('init')"
      >
        <span xText="count"></span>
      </div>
    );

    expect(html).toBe(
      '<div x-data="{ count: 0 }" :class="count > 5 ? \'green\' : \'red\'" @click="count++" x-init="console.log(\'init\')">' +
        '<span x-text="count"></span>' +
      '</div>'
    );
  });

  it('renders self-closing void elements', () => {
    const html = <input type="text" xValue="message" />;
    expect(html).toBe('<input type="text" :value="message">');
  });

  it('injects raw HTML with dangerouslySetInnerHTML', () => {
    const html = <div dangerouslySetInnerHTML={{ __html: '<b>raw</b>' }} />;
    expect(html).toBe('<div><b>raw</b></div>');
  });
});
