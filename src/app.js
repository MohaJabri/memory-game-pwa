// src/app.js
import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import './components/home-view.js';
import './components/game-board.js';

document.addEventListener('DOMContentLoaded', () => {
  // Función para manejar el renderizado de la vista actual
  function renderView() {
    const homeView = document.querySelector('home-view');
    const gameBoard = document.querySelector('game-board');
    
    const path = window.location.pathname;
    const baseRoute = '/memory-game-pwa';
    const params = new URLSearchParams(window.location.search);
    const playerName = params.get('name');
    
    if (path === baseRoute || path === `${baseRoute}/`) {
      homeView.style.display = 'block';
      gameBoard.style.display = 'none';
    } else if (path === `${baseRoute}/game` && playerName) {
      homeView.style.display = 'none';
      gameBoard.style.display = 'block';
      gameBoard.setAttribute('player-name', playerName);
    } else {
      // Redirigir a la página principal si la ruta no es válida
      window.location.href = `${window.location.origin}${baseRoute}`;
    }
  }

  // Llamamos a renderView para mostrar la vista correcta en función de la ruta
  renderView();

  // Establecer un "listener" para cambios en la URL, en caso de que se navegue
  window.addEventListener('popstate', renderView);
});
