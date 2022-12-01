import '../views/pages/game-page.js';
import '../views/pages/home-page.js';

const routes = {
  '/': 'home-page',
  '/game': 'game-page',
};

/** Todo lo que no vaya a index va aquí
 * Desde aqui tenemos que ver si es /game (o alguna otra posible)
 * Si lo es, deberiamos conseguir ir a / (index) y hacer goTo
 *    O hacer directamente goTo pero luego estamos "viviendo" en 404 y no puede ser
 *
 * Habria que redirigir siempre a la base pero recordar donde estabamos y hacer handleLocation luego...
 *
 */
// Al inicio, comprovar ruta
function dealWith404() {
  let url = window.location.pathname;

  // Contant que sempre va a 404,
  if (!routes[url]) {
    // Si es 404, va a home
    // Aixo perfecte
    window.location.replace('/');
  } else {
    // Si existeix, li afegim un hash per indicar que vé de 404
    window.location.replace(url.replace('/', '/#'));
  }
}
if (document.title === '404') dealWith404();

export function goTo(destiny) {
  if (!routes[destiny]) destiny = '/';

  history.pushState({page: destiny}, destiny, destiny);
  handleLocation();
}

function handleLocation() {
  // Si recibo una url que tiene #, significa que viene de 404 y lo que va detras es la pagina que pretendia cargar
  // Entonces molaria quitar el # y cargar el componente, pero con cargar el componente me conformo

  let path = window.location.pathname;

  // Si se esta mandando desde 404 tiene un hash:
  let hash = window.location.hash;
  if (hash) path = hash.replace('#', '/');

  let page = routes[path] || 'page-home';

  let newPage = document.createElement(page);

  document.querySelector('body').innerHTML = '';
  document.querySelector('body').appendChild(newPage);
}

onpopstate = () => handleLocation();
handleLocation();
