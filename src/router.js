const routes = {
  '/': 'home-page',
  '/game': 'game-page',
};

if (document.title === '404') dealWith404();
function dealWith404() {
  let url = window.location.pathname;
  if (!routes[url]) {
    window.location.replace('/');
  } else {
    window.location.replace(url.replace('/', '/#'));
  }
}

function handleLocation() {
  let path = window.location.pathname;

  let hash = window.location.hash;
  if (hash) path = hash.replace('#', '/');

  let page = routes[path] || 'page-home';

  let newPage = document.createElement(page);

  document.querySelector('body').innerHTML = '';
  document.querySelector('body').appendChild(newPage);
}

export function goTo(destiny) {
  if (!routes[destiny]) destiny = '/';

  history.pushState({page: destiny}, destiny, destiny);
  handleLocation();
}

onpopstate = () => handleLocation();
handleLocation();
