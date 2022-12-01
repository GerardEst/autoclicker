/** El estado del juego vive aquí
 * Siempre que algo deba afectar al estado, es tan facil como
 * importarlo y usar el metodo que se necesite.
 *
 * No se puede alterar directamente el estado por evitar algun
 * desastre, todo se hace a través de funciones que alteran el
 * estado de una forma conocida.
 *
 * Separando esto, facilitamos que mas adelante se pueda usar
 * una db real ya que solo habria que modificar estas funciones
 *
 * Tambien me servirá para guardar las cosas en localStorage
 */

// Si al iniciar vemos que hay un currentUser seteado en LS, debemos cargar lo suyo
// DUDO DE SI PONER ESTO AQUI. O DE COMO HACERLO EN GENERAL.
// ADEMAS, STATE DEBE SER UN SINGLETON. PERO NO IMPORTA PORQUE ESTO ES UN MODULO Y SE TRATA COMO TAL

// Algunas veces usas function y otras consts? De que vas?

const state = {
  currentPlayer: '',
  players: {},
};

function initState() {
  // Inicia el estado segun la info de localStorage

  let storageData = JSON.parse(localStorage.getItem('autoclicker'));
  if (storageData) {
    state.currentPlayer = storageData.currentPlayer;
    state.players = storageData.players;
  }
}
initState();

export const getCurrentPlayer = () => state.currentPlayer;
export const getPlayer = name => state.players[name];
export const getAllPlayers = () => state.players;

export const setCurrentPlayer = currentPlayer => {
  state.currentPlayer = currentPlayer;

  // Molaria poner algo en el objeto para que simplemente se diera cuenta de que cambia y
  // automaticamente actualizara LS
  saveChangesToLocalstorage();
};

export const addNewPlayer = name => {
  let newPlayerStats = {
    points: 0,
    upgrades: 0,
  };
  state.players[name] = newPlayerStats;

  saveChangesToLocalstorage();
};

export const alterPlayer = (player, prop, value) => {
  let playerToAlter = state.players[player];
  playerToAlter[prop] = value;

  // Aqui no sé si esto deberia hacerlo menos a menudo, porque cambiar el LS cada pocos milisegundos
  // sin parar yo que se
  saveChangesToLocalstorage();
};

export const clearCurrentPlayer = () => {
  state.currentPlayer = '';
  saveChangesToLocalstorage();
};

function saveChangesToLocalstorage() {
  localStorage.setItem('autoclicker', JSON.stringify(state));
}
