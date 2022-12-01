import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss';

import '../components/user-form.js';

export class homepage extends LitElement {
  static styles = [
    reset,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0 40px;
      }
      .welcome {
        display: flex;
        justify-content: center;
        flex: 1;

        align-items: center;
      }
      h1 {
        text-align: center;
        font-family: 'Alexandria';
        font-size: 3rem;
        font-weight: 900;
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
        <h1>CLICKER<br />BOAT</h1>
      </section>
      <section class="login">
        <user-form></user-form>
      </section>
    `;
  }
}

customElements.define('home-page', homepage);
