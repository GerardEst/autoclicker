const state = {
  currentPlayer: '',
  players: [],
};

let localStorageData = JSON.parse(localStorage.getItem('autoclicker'));
if (localStorageData) {
  initStateFromLocalStorage(localStorageData);

  if (!Array.isArray(localStorageData.players)) {
    console.warn('Old version of DB detected');

    let arrayOfPlayers = [];
    for (let key in localStorageData.players) {
      arrayOfPlayers.push({name: key, ...localStorageData.players[key]});
    }
    state.players = arrayOfPlayers;

    saveChangesToLocalstorage();

    console.info('DB updated');
  }
}

export const getCurrentPlayer = () => state.currentPlayer;
export const getStoredPlayer = name => state.players.find(player => player.name === name);
export const getAllPlayers = () => state.players.sort((a, b) => b.points - a.points);

export const setCurrentPlayer = currentPlayer => {
  state.currentPlayer = currentPlayer;
  saveChangesToLocalstorage();
};

export const addNewPlayer = name => {
  let newPlayerStats = {
    name: name,
    points: 0,
    upgrades: 0,
  };
  state.players.push(newPlayerStats);
  saveChangesToLocalstorage();
};

export const alterCurrentPlayer = (prop, value) => {
  let playerToAlter = state.players.find(player => player.name === state.currentPlayer);
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
