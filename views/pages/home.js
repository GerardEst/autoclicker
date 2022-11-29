import {LitElement, css, html} from 'lit';
import { reset } from '../resetcss';

import '../components/form.js';

export class pagehome extends LitElement {
  static styles = [
    reset,
    css`
    .welcome{
      display: flex;
      justify-content: center;
      
      align-items: center;
    }
    .login {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  `
  ];

  render() {
    return html`
      <section class="welcome">
        <h1>Title</h1>
      </section>
      <section class="login">
        <user-form></user-form>
      </section>
    `;
  }
  
}

customElements.define('page-home', pagehome);