import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss.js';
import * as state from '../../src/state.js';

export class rankingpage extends LitElement {
  static styles = [
    reset,
    css`
      :host {
        display: flex;
        flex-direction: column;
        max-width: var(--pageWidth);
        margin: auto;
        height: calc(100% - var(--pageBottomSpace));
        padding: 0 40px;
      }
      .rankList {
        display: flex;
        flex-direction: column;
        width: 100%;
        box-sizing: border-box;
        flex: 1;
        padding: 0 1rem;
        overflow-y: auto;
      }
      .rankItem {
        font-size: 1.5rem;
        padding: 0.4em 0;
        border-bottom: 0.8px solid black;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .rankItem p:last-child {
        font-family: 'Alexandria';
        font-size: 0.8em;
        font-weight: 700;
      }
    `,
  ];

  static properties = {
    playersList: {type: Object},
  };

  constructor() {
    super();
    this.playersList = null;
  }

  render() {
    return html`
      <h1>Ranking</h1>
      <div class="rankList">
        ${this.playersList.map(player => {
          return html`<div class="rankItem">
            <p>${player.name}</p>
            <p>${player.points}</p>
          </div>`;
        })}
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.playersList = state.getAllPlayers();
  }
}

customElements.define('ranking-page', rankingpage);
