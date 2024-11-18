import { fixture, html, expect } from '@open-wc/testing';
import { LitElement } from 'lit';
import '../../../src/components/home-view.js';

describe('HomeView Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<home-view></home-view>`);
  });

  it('renders correctly', async () => {
    const el = await fixture(html`<home-view></home-view>`);
    expect(el).to.exist;
  });

  it('initializes with empty name', () => {
    expect(element.name).to.equal('');
  });
});
