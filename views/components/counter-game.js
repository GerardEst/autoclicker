import {LitElement, css, html} from 'lit';
import * as state from '../../src/state.js';
import {reset} from '../resetcss';
import {upgrades} from '../../src/db.js';
import '../components/custom-button';
import '../components/buy-button';

export class counteregame extends LitElement {
  static styles = [
    reset,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
      }
      p {
        font-size: 2rem;
      }
      .counter {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .counter p {
        font-size: 1.5rem;
        font-weight: 200;
      }
      .counter .counter__num {
        font-family: 'Alexandria';
        font-weight: 800;
        font-size: 3rem;
      }
      .upgrades {
        margin-top: auto;
        width: 70%;
        max-width: 300px;
      }
      .messages {
        height: 4rem;
        display: flex;
        align-items: center;
      }
      .message {
        font-size: 1rem;
      }
      .money__num {
        font-size: 1.5rem;
      }
    `,
  ];

  static properties = {
    counter: {type: Number},
    message: {type: String},
    money: {type: Number},
    upgrades: {type: Object},
    player: {type: Object},
  };
  constructor() {
    super();
    this.counter = 0;
    this.player = {};
    this.intervals = [];
    this.upgrades = upgrades;
  }

  render() {
    return html`
      <section class="counter">
        <p>You've caught</p>
        <p class="counter__num">${this.counter}</p>
        <p>fish</p>
      </section>

      <section class="money">
        <p class="money__num">${this.player.money}€</p>
        <custom-button
          important
          bcolor="var(--gold)"
          color="white"
          id="sellFish"
          @click="${this._sellFish}"
          >Sell fish</custom-button
        >
      </section>

      <section class="upgrades">
        <custom-button id="toFish" @click="${this._increment}" big>Throw the rod</custom-button>
        ${upgrades.map(upgrade => {
          return html`
            <buy-button
              ?disabled="${this.player.money <
              this.UPGRADE_PRICE(upgrade.baseCost, this._playerUpgradeLevel(upgrade.name))}"
              @click="${() => this._buyUpgrade(upgrade.name)}"
              item="${upgrade.name}"
              level=${this._playerUpgradeLevel(upgrade.name)}
              cost=${this.UPGRADE_PRICE(upgrade.baseCost, this._playerUpgradeLevel(upgrade.name))}
            ></buy-button>
          `;
        })}
      </section>

      <section class="messages">
        <p class="message">${this.message}</p>
      </section>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    let currentPlayer = state.getCurrentPlayer();
    let isReturningPlayer = state.getStoredPlayer(currentPlayer);
    if (isReturningPlayer) {
      this.counter = isReturningPlayer.points;

      this.player = isReturningPlayer;

      // TODO -> Esto habra que reconstruirlo en base a todos los upgrades
      //this._rebuildIntervalsFor(this.upgrades);
      return;
    }
    state.addNewPlayer(currentPlayer);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._clearAllIntervals();
    state.clearCurrentPlayer();
  }

  _playerUpgradeLevel(name) {
    let playerUpgrades = this.player.upgrades;
    if (!playerUpgrades) {
      return 0;
    }
    let playerUpgrade = playerUpgrades.find(upgrade => upgrade.name === name);
    if (!playerUpgrade) {
      return 0;
    }
    return Number(playerUpgrade.level);
  }

  _increment() {
    this.counter++;
    state.alterCurrentPlayer('points', this.counter);
  }

  _sellFish() {
    this.player.money += this.counter;
    this.counter = 0;

    state.alterCurrentPlayer('money', this.player.money);
    state.alterCurrentPlayer('points', this.counter);
  }

  _buyUpgrade(name) {
    const upgrade = upgrades.find(upgrade => upgrade.name === name);

    if (
      this.player.money <
      this.UPGRADE_PRICE(upgrade.baseCost, this._playerUpgradeLevel(upgrade.name))
    ) {
      this._showMessage('Not enough credits');
      return;
    }
    // Reduim els diners segons l'upgrade_price calculat
    this.player.money -= this._playerUpgradeLevel(upgrade.name);

    // Al player, li guardem un nou nivell d'upgrade
    // Per tant hem de mirar si té l'upgrade, afegirli un nivell o iniciarlo
    let playerUpgrade = this.player.upgrades.find(
      playerUpgrade => playerUpgrade.name === upgrade.name
    );

    if (!playerUpgrade) {
      this.player.upgrades.push({
        name,
        level: this._playerUpgradeLevel(upgrade.name),
      });
    } else {
      playerUpgrade.level++;
    }
    /**
     * Ara els upgrades son una array, ja no té sentit que es guardi així
     * O guardo tota la nova array d'upgrades sencera, o ho faig a l'estat
     */
    state.alterCurrentPlayer('upgrades', this.player.upgrades);

    this._createNewUpgrader(upgrade.speed);
  }

  _getUpgradeLevel(upgrade) {
    state.getUpgradeLevel(upgrade);
  }

  _createNewUpgrader(speed) {
    const interval = setInterval(() => {
      this._increment();
    }, speed);
    this.intervals.push(interval);
  }

  _showMessage(message) {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  _rebuildIntervalsFor(amountOfUgrades) {
    for (let i = 0; i < amountOfUgrades; i++) {
      this._createNewUpgrader();
    }
  }

  _clearAllIntervals() {
    this.intervals.forEach(interval => {
      clearInterval(interval);
    });
    this.intervals = [];
  }

  UPGRADE_PRICE = (baseCost, upgrades) => baseCost + baseCost * upgrades;
}

customElements.define('counter-game', counteregame);
