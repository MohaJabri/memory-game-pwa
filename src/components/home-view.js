import { LitElement, html, css, unsafeCSS } from 'https://cdn.skypack.dev/lit';
import { saveUser } from '../services/indexedDB.js';

class HomeView extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: 100%;
      margin: 0;
      padding: 0;
      position: fixed;
      left: 0;
      top: 0;
      overflow-x: hidden;
    }

    .header {
      background-color: #2196F3;
      color: white;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
    }

    .header h1 {
      margin: 0;
      font-size: 1.5rem;
      text-align: center;
    }

    .main-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      width: 100%;
      box-sizing: border-box;
    }

    .card {
      width: 100%;
      max-width: 400px;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
      border-radius: 0.5rem;
    }

    .card-body {
      padding: 2rem;
    }

    .input-group {
      width: 100%;
      margin: 0 auto;
    }

    .form-control {
      width: 100%;
    }

    .btn {
      width: 100%;
      margin: 0 auto;
    }
  `;

  static properties = {
    name: { type: String },
    error: { type: String },
    isOnline: { type: Boolean }
  };

  constructor() {
    super();
    this.name = '';
    this.error = '';
    this.isOnline = navigator.onLine;
    
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.requestUpdate();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.requestUpdate();
    });
  }

  handleInput(e) {
    const value = e.target.value.slice(0, 12);
    this.name = value;
    this.error = '';
  }

  async _onStartGame() {
    if (this.name.trim() === '') {
      this.error = 'Por favor, ingresa tu nombre';
      this.requestUpdate();
      return;
    }
    
    try {
      await saveUser(this.name);
      const gameUrl = `${window.location.origin}/memory-game-pwa/game`;
      history.pushState({}, '', gameUrl);
      
      const event = new CustomEvent('game-start', {
        detail: { playerName: this.name },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
      
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error('Error:', error);
      this.error = 'Error al procesar el usuario. Por favor, intenta de nuevo.';
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class="header">
        <h1>Juego de Memoria</h1>
      </div>

      <div class="main-content">
        <div class="card shadow">
          <div class="card-body p-4">
            <div class="text-center mb-4">
              <i class="fas fa-gamepad fa-3x text-primary"></i>
            </div>

            <div class="form-group mb-4">
              <label for="username" class="form-label fw-bold">Nombre de Usuario</label>
              <div class="input-group">
                <span class="input-group-text">
                  <i class="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  id="username"
                  class="form-control form-control-lg ${this.error ? 'is-invalid' : ''}"
                  .value="${this.name}"
                  @input="${this.handleInput}"
                  maxlength="12"
                  placeholder="Introduce tu nombre"
                />
              </div>
              <div class="d-flex justify-content-between mt-1">
                <small class="text-muted">Máximo 12 caracteres</small>
                <small class="text-muted">${this.name.length}/12</small>
              </div>
              ${this.error ? html`
                <div class="invalid-feedback d-block">
                  ${this.error}
                </div>
              ` : ''}
            </div>

            <button 
              class="btn btn-primary btn-lg w-100"
              @click="${this._onStartGame}"
              ?disabled="${!this.name.trim()}"
            >
              <i class="fas fa-play me-2"></i>
              Empezar a Jugar
            </button>

            <div class="text-center mt-4">
              <small class="text-muted">
                <i class="fas fa-info-circle me-1"></i>
                ¡Pon a prueba tu memoria y diviértete!
              </small>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('home-view', HomeView);
