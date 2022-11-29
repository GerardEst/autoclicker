//import {Router} from '@vaadin/router';

/*
const router = new Router(document.getElementById('outlet'));
router.setRoutes([
  {path: '/', component: 'page-home'},
  {path: '/game', component: 'page-game'}
]);

/*
TODO -> Ver como funciona vaadin. Usa innerHTML? Hay algo mejor? 
        Puedo hacer que los componentes se carguen async?
        Hace falta el goTo? Podria hacer que simplemente lea la url cuando cambia?
        NO HACE FALTA TODO ESTO USAR VAADIN Y YA 
*/

import '../views/pages/game.js';
import '../views/pages/home.js';

const routes = {
  '/': 'page-home',
  '/game': 'page-game',
};

export function goTo(destiny) {
  if (!routes[destiny]) destiny = '/';

  history.pushState({page: destiny}, destiny, destiny);
  handleLocation();
}

function handleLocation() {
  const path = window.location.pathname;

  let page = routes[path] || 'page-home';
  let newPage = document.createElement(page);

  document.querySelector('#outlet').innerHTML = '';
  document.querySelector('#outlet').appendChild(newPage);
}

onpopstate = () => handleLocation();
handleLocation();