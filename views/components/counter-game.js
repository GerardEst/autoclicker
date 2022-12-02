import {LitElement, css, html} from 'lit';
import * as state from '../../src/state.js';
import {reset} from '../resetcss';
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
        align-items: center;
      }
      .counter p {
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
    `,
  ];

  static properties = {
    counter: {type: Number},
    message: {type: String},
  };
  constructor() {
    super();
    this.counter = 0;
    this.intervals = [];
    this.upgrades = 0;
    this.baseCost = 5;
    this.speed = 500;
  }

  render() {
    return html`
      <section class="counter">
        <p><span class="counter__num">${this.counter}</span>m</p>
      </section>
      <section class="upgrades">
        <custom-button @click="${this._increment}" big>Row</custom-button>
        <buy-button
          ?disabled="${this.counter < this.UPGRADE_PRICE()}"
          @click="${this._buyUpgrade}"
          item="sail"
          level=${this.upgrades}
          cost=${this.UPGRADE_PRICE()}
        ></buy-button>
      </section>
      <!-- Aixo podria ser un petit component apart al que se li passa el missatge -->
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
      this.upgrades = isReturningPlayer.upgrades;
      this._rebuildIntervalsFor(this.upgrades);
      return;
    }
    state.addNewPlayer(currentPlayer);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._clearAllIntervals();
    state.clearCurrentPlayer();
  }

  _increment() {
    this.counter++;
    state.alterCurrentPlayer('points', this.counter);
  }

  _buyUpgrade() {
    if (this.counter < this.UPGRADE_PRICE()) {
      this._showMessage('Not enough credits');
      return;
    }
    this.counter -= this.UPGRADE_PRICE();
    this._createNewUpgrader();
    this.upgrades++;
    state.alterCurrentPlayer('upgrades', this.upgrades);
  }

  _createNewUpgrader() {
    const interval = setInterval(() => {
      this._increment();
    }, this.speed);
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

  UPGRADE_PRICE = () => this.baseCost + this.baseCost * this.upgrades;
}

customElements.define('counter-game', counteregame);
