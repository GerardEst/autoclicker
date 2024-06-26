import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss.js';

export class buybutton extends LitElement {
  static properties = {
    disabled: {type: Boolean},
    big: {type: Boolean},
    item: {type: String},
    cost: {type: Number},
    level: {type: Number},
  };

  static styles = [
    reset,
    css`
      button {
        --borderradius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        padding: 0;
        margin: 0;
        font-size: 1rem;
        border: none;
        border-radius: calc(var(--borderradius) + 2px);
        font-family: 'Nunito', sans-serif;
      }
      button[disabled] {
        background-color: rgba(200, 200, 200, 0.6);
        border: none;
        pointer-events: none;
      }
      button span {
        padding: 0.7rem;
        align-self: stretch;
      }
      button[disabled] span {
        pointer-events: none;
      }
      button span:first-child {
        border-radius: var(--borderradius) 0 0 var(--borderradius);
        background-color: var(--levelUp);
      }
      button span:last-child {
        border-radius: 0 var(--borderradius) var(--borderradius) 0;
        background-color: var(--gold);
      }
    `,
  ];

  constructor() {
    super();
    this.disabled = false;
  }

  render() {
    return html`
      <button ?disabled="${this.disabled}">
        ${this.level > 0 ? html`<span> Lvl ${this.level} </span>` : ''}
        ${this.level > 0 ? html`Upgrade the` : html`Buy a`} ${this.item}

        <span> ${this.cost}$ </span>
      </button>
    `;
  }
}

customElements.define('buy-button', buybutton);
