import {LitElement, css, html} from 'lit';
import { reset } from '../resetcss';
import * as router from '../../src/router.js';
import * as state from '../../src/state.js'

export class userform extends LitElement {
  static styles = [
    reset,
    css`
    label {
      position: relative;
      display: flex;
      height: 100%;
    }
    label p {
      --fontsize: 1.2rem;
      position: absolute;
      left: 0.5rem;
      top: calc(var(--fontsize) / -2);
      text-transform: capitalize;

      font-size: var(--fontsize);
      background-color: var(--main-color);
      padding: 0 0.5rem;
      z-index: 1;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      font-size: 2rem;
      margin-bottom: 1rem;
      background: none;
      border: 2px solid black;
      border-radius: 5px;
      padding: 1rem;
      font-family: 'Nunito', sans-serif;
    }
    input[type='submit'] {
      background-color: var(--main-color);
    }
  `
  ];

  render() {
    return html`
        <form>
            <label for="user-name">
            <p>Name *</p>
            <input type="text" class="custom-input" autocomplete="username" name="username" id="user-name" aria-label="user-name" aria-required="true" required />
            </label>
            <input type="submit" value="Join" />
        </form>
    `;
  }

    firstUpdated() {
        const form = this.shadowRoot.querySelector('form');
        form.addEventListener('submit', event => {
            event.preventDefault();

            state.setCurrentPlayer(form['username'].value)
            
            router.goTo('/game');
        });
    }
  
}

customElements.define('user-form', userform);