import { LitElement, html, css } from 'lit';

class HomeView extends LitElement {
  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = '';
  }

  _onStartGame() {
    if (this.name.trim() === '') {
      alert('Por favor, ingresa tu nombre');
      return;
    }
    // Guardar nombre en la URL para pasar a la siguiente pantalla
    window.location.href = `/game?name=${encodeURIComponent(this.name)}`;
  }

  render() {
    return html`
      <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100">
        <h1 class="text-center mb-4">Juego de Memoria</h1>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            .value="${this.name}"
            @input="${(e) => (this.name = e.target.value)}"
            placeholder="Introduce tu nombre"
          />
        </div>
        <button class="btn btn-primary" @click="${this._onStartGame}">Empezar a Jugar</button>
      </div>
    `;
  }
}

customElements.define('home-view', HomeView);
