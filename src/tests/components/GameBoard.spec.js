import { fixture, html, expect } from '@open-wc/testing';

describe('GameBoard Component', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<game-board></game-board>`);
    expect(el).to.exist;
  });
});
