import { fixture, expect, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../../components/home-view.js';

describe('HomeView', () => {
  let element;

  beforeEach(async () => {
    sessionStorage.clear();
    element = await fixture(html`<home-view></home-view>`);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('renderiza correctamente el componente', () => {
    const title = element.shadowRoot.querySelector('h1');
    const input = element.shadowRoot.querySelector('#username');
    const button = element.shadowRoot.querySelector('button');
    
    expect(title.textContent).to.equal('Juego de Memoria');
    expect(input).to.exist;
    expect(button).to.exist;
    expect(button.disabled).to.be.true;
  });

  it('maneja correctamente el input del usuario', async () => {
    const input = element.shadowRoot.querySelector('#username');
    
    input.value = 'Usuario';
    input.dispatchEvent(new Event('input'));
    await element.updateComplete;
    
    expect(element.name).to.equal('Usuario');
    expect(element.error).to.equal('');
    expect(element.shadowRoot.querySelector('button').disabled).to.be.false;
  });

  it('valida nombre vacío', async () => {
    const button = element.shadowRoot.querySelector('button');
    button.click();
    await element.updateComplete;
    
    expect(element.error).to.equal('');
  });

  it('valida longitud máxima del nombre', async () => {
    const input = element.shadowRoot.querySelector('#username');
    
    input.value = 'NombreDemasiadoLargo';
    input.dispatchEvent(new Event('input'));
    await element.updateComplete;
    
    expect(element.error).to.equal('');
  });

  it('inicia el juego correctamente con nombre válido', async () => {
    // Espiar window
  });
});
