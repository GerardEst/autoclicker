//https://open-wc.org/docs/testing/testing-package/

import {html, fixture, expect} from '@open-wc/testing';

import '../views/components/menu-bar.js';
import * as state from '../src/state.js';

describe('Menu', () => {
  state.setCurrentPlayer('Gerard');

  it('says hello to the correct name', async () => {
    const el = await fixture(html`<menu-bar></menu-bar>`);

    expect(el.shadowRoot.querySelector('p').textContent).to.equal(`Hi Gerard`);
  });
});
