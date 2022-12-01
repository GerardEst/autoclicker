import {html, fixture, expect} from '@open-wc/testing';

import '../views/components/menu-bar.js';

describe('Menu', () => {
  it('says hello and the name saved in state', async () => {
    const el = await fixture(html` <menu-bar></menu-bar> `);
    expect(el.shadowRoot.querySelector('p').textContent).to.equal(`Hola`);

    //expect(true).to.equal(true)
  });
});
