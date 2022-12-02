const state = {
  currentPlayer: '',
  players: {},
};

let localStorageData = JSON.parse(localStorage.getItem('autoclicker'));
if (localStorageData) initStateFromLocalStorage(localStorageData);

export const getCurrentPlayer = () => state.currentPlayer;
export const getStoredPlayer = name => state.players[name];
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

export const alterCurrentPlayer = (prop, value) => {
  let playerToAlter = state.players[state.currentPlayer];
  playerToAlter[prop] = value;
  saveChangesToLocalstorage();
};

export const clearCurrentPlayer = () => {
  state.currentPlayer = '';
  saveChangesToLocalstorage();
};

function initStateFromLocalStorage(data) {
  state.currentPlayer = data.currentPlayer;
  state.players = data.players;
}

function saveChangesToLocalstorage() {
  localStorage.setItem('autoclicker', JSON.stringify(state));
}
