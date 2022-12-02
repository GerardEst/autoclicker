import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss';

export class rankingpage extends LitElement {
  static styles = [reset];

  render() {
    return html`
      <section>
        <h1>Ranking</h1>
      </section>
    `;
  }
}

customElements.define('ranking-page', rankingpage);
