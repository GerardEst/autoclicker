import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss.js';

export class custombutton extends LitElement {
  static properties = {
    disabled: {type: Boolean},
    big: {type: Boolean},
    color: {type: String},
  };

  static styles = [
    reset,
    css`
      button {
        width: 100%;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-size: 1rem;
        margin-bottom: 1rem;
        border: none;
        border-radius: 5px;
        padding: 0.7rem 0.7rem;
        font-family: 'Nunito', sans-serif;
        background-color: white;
      }
      button[big] {
        font-size: 1.5rem;
        padding: 1rem 2rem;
      }
    `,
  ];

  constructor() {
    super();
    this.disabled = false;
  }

  render() {
    return html`
      <button
        ?disabled="${this.disabled}"
        ?big="${this.big}"
        .style="background-color: ${this.color}"
      >
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('custom-button', custombutton);
