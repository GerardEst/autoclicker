import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss';

import '../components/link-button.js';
import '../components/user-form.js';

export class homepage extends LitElement {
  static styles = [
    reset,
    css`
      :host {
        display: flex;
        flex-direction: column;
        padding: 0 40px;
        max-width: var(--pageWidth);
        height: calc(100% - var(--pageBottomSpace));
        margin: auto;
      }
      .welcome {
        display: flex;
        justify-content: center;
        flex: 1;

        align-items: center;
      }
      .login {
        display: flex;
        align-items: flex-start;
        justify-content: center;

        flex: 2;
      }
    `,
  ];

  render() {
    return html`
      <section class="welcome">
        <h1>FISHING<br />BOAT</h1>
      </section>
      <section class="login">
        <user-form></user-form>
      </section>
      <section>
        <link-button href="/ranking">Ranking</link-button>
      </section>
    `;
  }
}

customElements.define('home-page', homepage);
