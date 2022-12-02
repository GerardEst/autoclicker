//https://open-wc.org/docs/testing/testing-package/

import {html, fixture, expect, aTimeout} from '@open-wc/testing';

import '../views/pages/home-page.js';
//import '../views/pages/ranking-page.js';

describe('Can go to ranking from home', async () => {
  const home = await fixture(html`<home-page></home-page>`);
  const rankingButton = home.shadowRoot.querySelector('link-button[href="/ranking"]');

  it('Shows the ranking button on the homepage', async () => {
    expect(rankingButton).to.exist;
  });

  it('Loads the ranking-page component', async () => {
    /*
    Want to test if component loads when button click
    
    await rankingButton.click();
    const page = document.querySelector('body');

    console.log(page);
    expect(page.querySelector('ranking-page')).to.exist;
    */
    // And the url says /ranking
  });
});
