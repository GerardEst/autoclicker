import '../views/pages/game-page.js';
import '../views/pages/home-page.js';
import '../views/pages/ranking-page.js';

import './router.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(res => console.log('service worker registered'))
      .catch(err => console.log('service worker not registered', err));
  });
}
