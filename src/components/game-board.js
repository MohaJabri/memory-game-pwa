import { LitElement, html, unsafeCSS } from 'lit';
import { saveUserScore, getCurrentUser } from '../services/indexedDB.js';

class GameBoard extends LitElement {
  static styles = unsafeCSS`
    .header {
      background-color: #2196F3;
      color: white;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .header > * {
      flex: 1;
      min-width: 200px;
      text-align: center;
    }

    .header span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 10px;
    }

    .header select {
      background-color: white;
      border: none;
      padding: 5px;
      border-radius: 4px;
      max-width: 200px;
    }

    .difficulty-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }

    .game-container {
      text-align: center;
      padding: 20px;
    }
    .game-header {
      text-align: center;
      margin-bottom: 20px;
    }
    .board {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      grid-gap: 10px;
      justify-content: center;
      margin-bottom: 20px;
    }
    .card {
      width: 100px;
      height: 100px;
      background-color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 24px;
      border-radius: 8px;
      user-select: none;
    }
    .hidden {
      background-color: #ccc;
    }
    .revealed {
      background-color: #f9f9f9;
      color: #333;
    }
    .correct {
      background-color: #4CAF50;
      color: white;
    }
    .wrong {
      background-color: #f44336;
      color: white;
    }
    .button {
      background-color: #4CAF50;
      color: white;
      padding: 10px;
      cursor: pointer;
      font-size: 18px;
      border-radius: 5px;
    }
    select {
      padding: 10px;
      font-size: 16px;
      margin-left: 10px;
    }
    .message {
      font-size: 18px;
      font-weight: bold;
      margin: 10px 0;
      color: ${this.gameOver ? '#f44336' : '#4CAF50'};
    }
    .button-container {
      margin-top: 20px;
      text-align: center;
    }
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    .btn-success {
      background-color: #4CAF50;
      color: white;
    }
    .btn-success:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    .btn-new-game {
      background-color: #2196F3;
      color: white;
    }
  `;

  static properties = {
    userName: { type: String },
    difficulty: { type: String },
    numbers: { type: Array },
    revealedNumbers: { type: Array },
    selectedNumber: { type: Number },
    targetNumber: { type: Number },
    score: { type: Number },
    gameOver: { type: Boolean },
    timer: { type: Number },
    timerId: { type: Object },
    message: { type: String },
    isRoundInProgress: { type: Boolean },
    name: { type: String },
    error: { type: String },
    isOnline: { type: Boolean }
  };

  constructor() {
    super();
    this.playerName = '';
    this.score = 0;
    this.difficulty = 'medio';
    this.numbers = [];
    this.revealedNumbers = [];
    this.selectedNumber = null;
    this.targetNumber = null;
    this.gameOver = false;
    this.timer = 0;
    this.timerId = null;
    this.message = '';
    this.isRoundInProgress = false;
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

    // Escuchar el evento game-start
    window.addEventListener('game-start', (e) => {
      this.playerName = e.detail.playerName;
      this.requestUpdate();
    });
  }

  // Iniciar el juego y mostrar los números
  startGame() {
    if (this.gameOver) {
      this.score = 0; 
    }
    this.gameOver = false;
    this.message = '';
    this.numbers = this.generateRandomNumbers();
    this.revealedNumbers = new Array(9).fill(null);
    this.isRoundInProgress = true;

    // Configurar el tiempo de visualización según la dificultad
    switch (this.difficulty) {
      case 'bajo':
        this.timer = 10;
        break;
      case 'medio':
        this.timer = 5;
        break;
      case 'alto':
        this.timer = 2;
        break;
    }

    // Mostrar los números durante el tiempo de dificultad
    this._revealNumbers();
  }

  // Genera números aleatorios del 1 al 9
  generateRandomNumbers() {
    let numbers = [];
    while (numbers.length < 9) {
      let num = Math.floor(Math.random() * 9) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers;
  }

  // Mostrar números durante el tiempo de visualización
  _revealNumbers() {
    this.revealedNumbers = [...this.numbers];
    this.requestUpdate();
    this.timerId = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(this.timerId);
        this.revealedNumbers = new Array(9).fill(null);
        this.targetNumber = this.numbers[Math.floor(Math.random() * 9)];
        this.requestUpdate();
      }
    }, 1000);
  }

  // Maneja el clic de un cuadro en el tablero
  async onCardClick(index) {
    if (this.gameOver || this.timer > 0) return;

    const selectedNumber = this.numbers[index];
    this.revealedNumbers[index] = selectedNumber;

    if (selectedNumber === this.targetNumber) {
      const DIFFICULTY_POINTS = {
        'bajo': 10,
        'medio': 20,
        'alto': 30
      };
      let points = DIFFICULTY_POINTS[this.difficulty] || 0;
      this.score += points;
      await saveUserScore(points);
      this.message = '¡Correcto! Continúa jugando.';
      this.requestUpdate();
      setTimeout(() => {
        this.startGame();
      }, 1000);
    } else {
      this.endGame('¡Juego Terminado! Has perdido.');
    }
  }

  // Finaliza el juego
  endGame(message) {
    this.gameOver = true;
    this.message = message;
    this.isRoundInProgress = false;
    
    // Vibrar el dispositivo si está disponible y el juego ha terminado por perder
    if ('vibrate' in navigator && message.includes('perdido')) {
      navigator.vibrate([200, 100, 200]); 
    }
    
    this.requestUpdate();
  }

  // Maneja el cambio de dificultad
  handleDifficultyChange(event) {
    this.difficulty = event.target.value;
  }

  render() {
    return html`
      <div class="game-container">
        <div class="header">
          <span>¡Hola, ${this.playerName}!</span>
          ${this._renderDifficultySelector()}
          <span>Puntos: ${this.score}</span>
        </div>

        ${this.targetNumber && this.timer <= 0 ? 
          html`<h2>¿Dónde está el número ${this.targetNumber}?</h2>` : 
          html`<h2>Tiempo restante: ${this.timer}</h2>`
        }
        
        ${this.message ? html`<p class="message">${this.message}</p>` : ''}

        <div class="board">
          ${this.numbers.map((number, index) => html`
            <div 
              class="card ${this._getCardClass(index)}"
              @click="${() => this.onCardClick(index)}">
              ${this.revealedNumbers[index] !== null ? this.revealedNumbers[index] : ''}
            </div>
          `)}
        </div>

        <div class="button-container">
          ${this.gameOver ? 
            html`<button class="btn btn-new-game" @click="${this.startGame}">Nueva Partida</button>` :
            html`<button class="btn btn-success" 
                        @click="${this.startGame}"
                        ?disabled="${this.isRoundInProgress}">
              ${this.isRoundInProgress ? 'Ronda en progreso' : 'Comenzar'}
            </button>`
          }
        </div>
      </div>
    `;
  }

  _getCardClass(index) {
    if (this.revealedNumbers[index] === null) {
      return 'hidden';
    }
    if (this.timer > 0) {
      return 'revealed';
    }
    return this.revealedNumbers[index] === this.targetNumber ? 'correct' : 'wrong';
  }

  _renderDifficultySelector() {
    return html`
      <div class="difficulty-container">
        <label for="difficulty">Dificultad:</label>
        <select id="difficulty" @change="${this.handleDifficultyChange}" .value="${this.difficulty}">
          <option value="bajo">Bajo (10s) - 10 puntos</option>
          <option value="medio">Medio (5s) - 20 puntos</option>
          <option value="alto">Alto (2s) - 30 puntos</option>
        </select>
      </div>
    `;
  }
}

customElements.define('game-board', GameBoard);
