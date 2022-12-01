const state = {
  currentPlayer: '',
  players: {},
};

let localStorageData = JSON.parse(localStorage.getItem('autoclicker'));
if (localStorageData) initStateFromLocalStorage();

export const getCurrentPlayer = () => state.currentPlayer;
export const getPlayer = name => state.players[name];
export const getAllPlayers = () => state.players;

export const setCurrentPlayer = currentPlayer => {
  state.currentPlayer = currentPlayer;
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
  saveChangesToLocalstorage();
};

export const clearCurrentPlayer = () => {
  state.currentPlayer = '';
  saveChangesToLocalstorage();
};

function initStateFromLocalStorage() {
  state.currentPlayer = localStorageData.currentPlayer;
  state.players = localStorageData.players;
}

function saveChangesToLocalstorage() {
  localStorage.setItem('autoclicker', JSON.stringify(state));
}
