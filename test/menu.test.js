import {html, fixture, expect} from '@open-wc/testing';

import '../views/components/menu-bar.js';
import * as state from '../src/state.js';

/**
 * Obre el component, que aixi tal cual hi diu "Hola "
 * Pero per testejar algo util hauriem de veure si, habenti un currentPlayer a l'state, diu hola al currentplayer
 *
 * Per tant suposo que he d'iniciar l'state d'alguna manera
 */
describe('Menu', () => {
  // Aqui empleno l'state?
  state.setCurrentPlayer('Gerard');

  it('says hello to the correct name', async () => {
    const el = await fixture(html`<menu-bar></menu-bar>`);

    expect(el.shadowRoot.querySelector('p').textContent).to.equal(`Hi Gerard`);
  });
});
