import {LitElement, css, html} from 'lit';
import '../components/menu-bar.js';
import '../components/counter-game.js';

export class gamepage extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `;

  render() {
    return html`
      <menu-bar></menu-bar>
      <counter-game></counter-game>
    `;
  }
}
customElements.define('game-page', gamepage);
