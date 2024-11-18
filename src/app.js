// src/app.js
import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import './components/home-view.js';
import './components/game-board.js';

document.addEventListener('DOMContentLoaded', () => {
  function renderView() {
    const homeView = document.querySelector('home-view');
    const gameBoard = document.querySelector('game-board');
    
    const path = window.location.pathname;
    const baseRoute = '/memory-game-pwa';
    const baseUrl = 'https://mohajabri.github.io/memory-game-pwa/';
    
    if (path === `${baseRoute}/game`) {
      const currentUser = sessionStorage.getItem('currentUser');
      if (!currentUser) {
        window.location.href = baseUrl;
        return;
      }
      homeView.style.display = 'none';
      gameBoard.style.display = 'block';
    } else if (path === baseRoute || path === `${baseRoute}/`) {
      homeView.style.display = 'block';
      gameBoard.style.display = 'none';
    } else {
      window.location.href = baseUrl;
    }
  }

  
  renderView();

  // Establecer un "listener" para cambios en la URL, en caso de que se navegue
  window.addEventListener('popstate', renderView);
});
