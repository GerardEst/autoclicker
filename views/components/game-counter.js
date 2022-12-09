import {LitElement, html, css} from 'lit-element';
import {reset} from '../resetcss';

class GameCounter extends LitElement {
  static styles = [
    reset,
    css`
      .counter {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .counter p {
        font-size: 1.5rem;
        font-weight: 200;
      }
      .counter .counter__num {
        font-family: 'Alexandria';
        font-weight: 800;
        font-size: 3rem;
      }
    `,
  ];

  static properties = {
    counter: {type: Number},
  };

  render() {
    return html`
      <section class="counter">
        <p>You've caught</p>
        <p class="counter__num">${this.counter}</p>
        <p>fish</p>
      </section>
    `;
  }
}
customElements.define('game-counter', GameCounter);
