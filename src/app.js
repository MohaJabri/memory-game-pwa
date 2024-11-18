import { LitElement, html, css } from 'lit';
import './components/home-view.js';
import './components/game-board.js';

document.addEventListener('DOMContentLoaded', () => {
  function renderView() {
    const homeView = document.querySelector('home-view');
    const gameBoard = document.querySelector('game-board');
    
    const path = window.location.pathname;
    const baseRoute = '/memory-game-pwa';
    const baseUrl = 'https://mohajabri.github.io/memory-game-pwa/';
    
    const validPaths = ['/', '/game'];
    const currentPath = path.replace(baseRoute, '');
    
    if (!validPaths.includes(currentPath)) {
      window.location.replace(baseUrl);
      return;
    }
    
    if (currentPath === '/game') {
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
