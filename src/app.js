// src/app.js
import { LitElement, html, css } from 'lit';
import './components/home-view.js';
import './components/game-board.js';

document.addEventListener('DOMContentLoaded', () => {
  const homeView = document.querySelector('home-view');
  const gameBoard = document.querySelector('game-board');
  const baseRoute = '/memory-game-pwa';
  const baseUrl = 'https://mohajabri.github.io/memory-game-pwa/';

  function renderView() {
    const path = window.location.pathname.replace(baseRoute, '');
    const validPaths = ['/', '/game'];

    if (!validPaths.includes(path)) {
      if (window.location.href !== baseUrl) {
        window.location.replace(baseUrl);
      }
      return;
    }

    if (path === '/game') {
      const currentUser = sessionStorage.getItem('currentUser');
      if (!currentUser) {
        window.location.replace(baseUrl);
        return;
      }
      homeView.style.display = 'none';
      gameBoard.style.display = 'block';
    } else {
      homeView.style.display = 'block';
      gameBoard.style.display = 'none';
    }
  }

  renderView();

  window.addEventListener('popstate', renderView);
});
