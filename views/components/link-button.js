import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss.js';
import {goTo} from '../../src/router.js';

export class linkbutton extends LitElement {
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

        background-color: #283b3b;
        border-radius: 5px;

        color: white;
        font-size: 1rem;
        text-decoration: none;

        justify-content: center;
      }
    `,
  ];

  render() {
    return html`
      <a @click="${this._routeTo}">
        <slot></slot>
      </a>
    `;
  }

  _routeTo(e) {
    e.preventDefault();
    goTo(this.href);
  }
}

customElements.define('link-button', linkbutton);
