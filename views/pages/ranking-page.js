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
        flex: 1;
        overflow-y: auto;
      }
      .rankItem {
        background-color: white;
      }
      .rankItem:nth-child(even) {
        background-color: lightblue;
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
          return html`<div class="rankItem">${player.name}</div>`;
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
