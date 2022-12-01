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

        border-radius: var(--borderradius);
        width: 100%;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-size: 1rem;
        margin-bottom: 1rem;
        border: none;
        border-radius: 5px;
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
        background-color: #71ba51;
      }
      button span:last-child {
        border-radius: 0 var(--borderradius) var(--borderradius) 0;
        background-color: #fec606;
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
        <span> Lvl ${this.level > 0 ? this.level : ''} </span>

        ${this.level > 0 ? html`Upgrade the` : html`Buy a`} ${this.item}

        <span> ${this.cost}$ </span>
      </button>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define('buy-button', buybutton);
