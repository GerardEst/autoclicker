import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss.js';
import './link-button';
import * as state from '../../src/state.js';

export class menubar extends LitElement {
  static styles = [
    reset,
    css`
      .menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;

        padding: 1rem;
      }
      p {
        font-size: 1.5rem;
        font-weight: 200;
      }
      p span {
        font-weight: 900;
      }
    `,
  ];

  render() {
    return html`
      <div class="menu">
        <div>
          <p>Hi <span>${state.getCurrentPlayer()}</span></p>
        </div>
        <link-button href="/"
          >Exit <img alt="Exit button" width="20px" src="/img/exit.svg"
        /></link-button>
      </div>
    `;
  }
}

customElements.define('menu-bar', menubar);
