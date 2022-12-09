import {LitElement, css, html} from 'lit';
import * as state from '../../src/state.js';
import * as db from '../../src/db.js';
import {reset} from '../resetcss';
import '../components/custom-button';
import '../components/game-counter';
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
    player: {type: Object},
  };
  constructor() {
    super();
    this.counter = 0;
    this.intervals = [];
    this.player = {
      money: 0,
      upgrades: [],
    };
  }

  render() {
    return html`
      <game-counter counter="${this.counter}"></game-counter>

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
        <custom-button id="toFish" @click="${() => this._incrementBy(50)}" big
          >Throw the rod</custom-button
        >
        ${db.upgrades.map(upgrade => {
          return html`
            <buy-button
              ?disabled="${this.player.money < this.GET_UPGRADE_PRICE(upgrade)}"
              @click="${() => this._buyUpgrade(upgrade.name)}"
              item="${upgrade.name}"
              level=${this.GET_UPGRADE_LEVEL(upgrade.name)}
              cost=${this.GET_UPGRADE_PRICE(upgrade)}
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
      this._rebuildIntervalsFor(isReturningPlayer.upgrades);
      return;
    }
    state.addNewPlayer(currentPlayer);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._clearAllIntervals();
    state.clearCurrentPlayer();
  }

  _incrementBy(amount) {
    this.counter += amount;
    state.alterCurrentPlayer('points', this.counter);
  }

  _sellFish() {
    this.player.money += this.counter;
    this.counter = 0;

    state.alterCurrentPlayer('money', this.player.money);
    state.alterCurrentPlayer('points', this.counter);
  }

  _buyUpgrade(upgradeName) {
    const databaseUpgrade = db.upgrades.find(upgrade => upgrade.name === upgradeName);

    if (this.player.money < this.GET_UPGRADE_PRICE(databaseUpgrade)) {
      this._showMessage('Not enough credits');
      return;
    }

    this.player.money -= this.GET_UPGRADE_PRICE(databaseUpgrade);

    let playerUpgrade = this.player.upgrades.find(
      playerUpgrade => playerUpgrade.name === databaseUpgrade.name
    );

    if (!playerUpgrade) {
      this.player.upgrades.push({
        name: databaseUpgrade.name,
        level: 1,
      });
    } else {
      playerUpgrade.level++;
    }

    state.alterCurrentPlayer('upgrades', this.player.upgrades);

    this._updateUpgradeInterval(
      databaseUpgrade.name,
      databaseUpgrade.speed,
      databaseUpgrade.damage,
      playerUpgrade ? playerUpgrade.level : 1
    );

    this.requestUpdate();
  }

  _updateUpgradeInterval(name, speed, damage, level) {
    let time = speed / level;

    clearInterval(this.intervals[name]);
    this.intervals[name] = setInterval(() => {
      this._incrementBy(damage);
    }, time);

    console.log(this.intervals);
  }

  _showMessage(message) {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  _rebuildIntervalsFor(playerUpgrades) {
    for (let playerUpgrade of playerUpgrades) {
      const upgrade = db.upgrades.find(upgrade => upgrade.name === playerUpgrade.name);
      for (let i = 0; i < playerUpgrade.level; i++) {
        this._updateUpgradeInterval(
          upgrade.name,
          upgrade.speed,
          upgrade.damage,
          playerUpgrade.level
        );
      }
    }
  }

  _clearAllIntervals() {
    this.intervals.forEach(interval => {
      clearInterval(interval);
    });
    this.intervals = [];
  }

  // CONSTANTS
  GET_UPGRADE_PRICE = upgrade => {
    return this.CALCULATE_UPGRADE_PRICE(upgrade.baseCost, this.GET_UPGRADE_LEVEL(upgrade.name));
  };

  GET_UPGRADE_LEVEL = name => {
    let playerUpgrade = this.player.upgrades.find(upgrade => upgrade.name === name);
    if (!playerUpgrade) return 0;

    return Number(playerUpgrade.level);
  };

  CALCULATE_UPGRADE_PRICE = (baseCost, upgrades) => baseCost + baseCost * upgrades;
}

customElements.define('counter-game', counteregame);
