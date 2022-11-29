import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss.js';
import {goTo} from '../../src/router.js';

export class internlink extends LitElement {
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
        font-size: 40px;
        color: white;
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

  _routeTo(e) {
    e.preventDefault();
    const destiny = e.target.parentNode.getAttribute('href');
    goTo(destiny);
  }
}

customElements.define('intern-link', internlink);
