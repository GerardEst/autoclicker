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
    this.cost = this.baseCost;
    this.speed = 1000;
    this.player = state.getCurrentPlayer();
  }

  render() {
    return html`
      <section class="counter">
        <p>${this.counter}m</p>
      </section>
      <section class="upgrades">
        <custom-button @click="${this._increment}" big>Row</custom-button>

        <buy-button
          ?disabled="${this.counter < this._cost()}"
          @click="${this._buyIncrement}"
          item="sail"
          level=${this.upgrades}
          cost=${this._cost()}
        >
        </buy-button>
      </section>
      <section class="messages">
        <p class="message">${this.message}</p>
      </section>
    `;
  }

  _increment() {
    this.counter++;

    state.alterPlayer(this.player, 'points', this.counter);
  }

  _buyIncrement() {
    if (this.counter < this._cost()) {
      this._showMessage('Not enough money');
      return;
    }
    this.counter -= this._cost();

    this._createNewInterval();
    this.upgrades++;

    state.alterPlayer(this.player, 'upgrades', this.upgrades);
  }

  _showMessage(message) {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  _createNewInterval() {
    const interval = setInterval(() => {
      this._increment();
    }, this.speed);
    this.intervals.push(interval);
  }

  _cost() {
    return this.baseCost + this.baseCost * this.upgrades;
  }

  // Aqui dins podria millorar la cosa una miqueta per fer-ho mes entenedor
  connectedCallback() {
    super.connectedCallback();

    let allPlayers = state.getAllPlayers();

    if (allPlayers[this.player]) {
      let player = state.getPlayer(this.player);

      this.counter = player.points;
      this.upgrades = player.upgrades;

      // Iniciem tots els intervals (APARTAR AIXO D'AQUI)
      let upgrades = state.getPlayer(this.player).upgrades;
      for (let i = 0; i < upgrades; i++) {
        this._createNewInterval();
      }
    } else {
      state.addNewPlayer(this.player);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();

    // Matem tots els intervals (APARTAR AIXO D'AQUI)
    this.intervals.forEach(interval => {
      clearInterval(interval);
    });
    this.intervals = [];

    state.clearCurrentPlayer();
  }
}

customElements.define('counter-game', counteregame);
