import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss.js';
import {goTo} from '../../src/router.js';

export class buttonlink extends LitElement {
  constructor() {
    super();
    this.href = '/game';
  }

  static properties = {
    href: {},
  };

  static styles = [
    reset,
    css`
      a {
        display: flex;
        align-items: center;
        padding: 1rem;
        gap: 0.5rem;

        background-color: #edf6f6;
        border-radius: 5px;

        color: black;
        font-size: 1rem;
        text-decoration: none;
      }
    `,
  ];

  render() {
    return html`
      <a @click="${this._routeTo}" href="${this.href}">
        <slot></slot>
      </a>
    `;
  }

  _routeTo() {
    goTo(this.href);
  }
}

customElements.define('button-link', buttonlink);
