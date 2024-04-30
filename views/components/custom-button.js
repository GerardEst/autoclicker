import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss.js';

export class custombutton extends LitElement {
  static properties = {
    disabled: {type: Boolean},
    big: {type: Boolean},
    color: {type: String},
    bcolor: {type: String},
    important: {type: Boolean},
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
      button[important] {
        font-family: 'Alexandria';
        font-weight: 800;
        font-size: 1rem;
        letter-spacing: 0.05rem;
      }
    `,
  ];

  constructor() {
    super();
    this.disabled = false;
    this.important = false;
  }

  render() {
    return html`
      <button
        ?disabled="${this.disabled}"
        ?big="${this.big}"
        ?important="${this.important}"
        .style="background-color: ${this.bcolor}; color: ${this.color}"
      >
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('custom-button', custombutton);
