//https://open-wc.org/docs/testing/testing-package/

import {html, fixture, expect, aTimeout} from '@open-wc/testing';

import '../views/pages/home-page.js';
import '../views/pages/ranking-page.js';
import * as state from '../src/state.js';

describe('Can go to ranking from home', async () => {
  const home = await fixture(html`<home-page></home-page>`);
  const rankingButton = home.shadowRoot.querySelector('link-button[href="/ranking"]');

  it('Shows the ranking button on the homepage', async () => {
    expect(rankingButton).to.exist;
  });

  it('Loads the ranking-page component', async () => {
    rankingButton.shadowRoot.querySelector('a').click();

    const page = document.querySelector('body');

    expect(page.querySelector('ranking-page')).to.exist;
  });
});

describe('Ranking page', async () => {
  state.addNewPlayer('Test Player 1');
  state.addNewPlayer('Test Player 2');
  state.addNewPlayer('Test Player 3');
  const rankingPage = await fixture(html`<ranking-page></ranking-page>`);

  it('Loads and has a shadowDom', () => {
    expect(rankingPage.shadowRoot).to.exist;
  });

  it('Shows correct people from the state', () => {
    const rank = rankingPage.shadowRoot.querySelector('.rankItem');
    expect(rank.textContent).to.equal('Test Player 1');
  });
});
