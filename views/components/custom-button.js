import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss.js';

export class custombutton extends LitElement {
  static properties = {
    disabled: {type: Boolean}
  }
  static styles = [
    reset,
    css`
      button {
        width: 100%;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-size: 2rem;
        margin-bottom: 1rem;
        background: none;
        border: 2px solid black;
        border-radius: 5px;
        padding: 1rem 2rem;
      }
      button[disabled=true]{
        background-color: red
      }
    `,
  ];

  constructor() {
    super()
    this.disabled = false
  }

  render() {
    return html`
            <button ?disabled="${this.disabled}">
              <slot></slot>
            </button>
        `;
  }

  connectedCallback() {
    super.connectedCallback()
  }
}

customElements.define('custom-button', custombutton);
