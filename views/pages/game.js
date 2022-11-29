import {LitElement, css, html} from 'lit';
import '../components/menu-bar.js';
import '../components/counter-game.js';

export class pagegame extends LitElement {
  render() {
    return html`
      <menu-bar></menu-bar>
      <counter-game></counter-game>  
    `;
  }
}
customElements.define('page-game', pagegame);
