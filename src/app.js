// src/app.js
import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import './components/home-view.js';
import './components/game-board.js';

document.addEventListener('DOMContentLoaded', () => {
  // Función para manejar el renderizado de la vista actual
  function renderView() {
    const homeView = document.querySelector('home-view');
    const gameBoard = document.querySelector('game-board');
    
    // Si estamos en la página de inicio
    if (window.location.pathname === '/') {
      homeView.style.display = 'block';
      gameBoard.style.display = 'none';
    }
    // Si estamos en la página del juego
    else if (window.location.pathname === '/game') {
      homeView.style.display = 'none';
      gameBoard.style.display = 'block';
    }
  }

  // Llamamos a renderView para mostrar la vista correcta en función de la ruta
  renderView();

  // Establecer un "listener" para cambios en la URL, en caso de que se navegue
  window.addEventListener('popstate', renderView);
});
