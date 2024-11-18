import { fixture, expect } from '@open-wc/testing';
import '../../components/game-board.js';

describe('GameBoard', () => {
  let element;

  beforeEach(async () => {
    element = await fixture('<game-board></game-board>');
  });

  it('debería renderizar con valores iniciales correctos', () => {
    expect(element.score).to.equal(0);
    expect(element.difficulty).to.equal('medio');
    expect(element.gameOver).to.be.false;
    expect(element.isRoundInProgress).to.be.false;
  });

  it('debería cambiar la dificultad correctamente', async () => {
    const select = element.shadowRoot.querySelector('#difficulty');
    select.value = 'medio';
    select.dispatchEvent(new Event('change'));
    await element.updateComplete;
    
    expect(element.difficulty).to.equal('medio');
  });

  it('debería iniciar el juego correctamente', async () => {
    element.startGame();
    await element.updateComplete;

    expect(element.isRoundInProgress).to.be.true;
    expect(element.numbers).to.have.lengthOf(9);
    expect(element.revealedNumbers).to.have.lengthOf(9);
  });
});
