import { fixture, html, expect } from '@open-wc/testing';
import { LitElement } from 'lit';
import '../../../src/components/game-board.js';

describe('GameBoard Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<game-board></game-board>`);
  });

  it('renders correctly', async () => {
    const el = await fixture(html`<game-board></game-board>`);
    expect(el).to.exist;
  });

  it('initializes with default values', () => {
    expect(element.score).to.equal(0);
    expect(element.gameOver).to.be.false;
  });
});
