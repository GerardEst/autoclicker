//https://open-wc.org/docs/testing/testing-package/

import {html, fixture, expect, aTimeout} from '@open-wc/testing';

import '../views/components/counter-game.js';

/** Deberia importar algunas opciones comunes y que necesito que esten pareadas
 * como el coste base de un upgrade o el tiempo de intervalo
 * De momento hago:
 */
const baseCost = 5;

describe('Counter game flow -> click and buy upgrade', async () => {
  const el = await fixture(html`<counter-game></counter-game>`);
  const counter = el.shadowRoot.querySelector('.counter__num');
  const buyButton = el.shadowRoot.querySelector('buy-button');

  it('Counter starts in 0', () => {
    expect(Number(counter.textContent)).to.equal(0);
  });

  it('Counter +1 when click Row', async () => {
    const rowButton = el.shadowRoot.querySelector('custom-button');
    await rowButton.click();

    expect(Number(counter.textContent)).to.equal(1);
  });

  it('Click Row will eventually (in less than 100 taps) unlock a buy option', async () => {
    const rowButton = el.shadowRoot.querySelector('custom-button');

    for (let i = 0; i < 100; i++) {
      await rowButton.click();
      if (buyButton.getAttribute('disabled') === null) break;
    }

    expect(buyButton).to.not.have.attribute('disabled');
  });

  it('Buy upgrade makes counter go down by cost', async () => {
    const currentCounterNum = Number(counter.textContent);
    await buyButton.click();

    expect(Number(counter.textContent)).to.equal(currentCounterNum - baseCost);
  });

  it('Buy upgrade makes counter grow automatically', async () => {
    const currentCounterNum = Number(counter.textContent);
    await aTimeout(1500);

    expect(Number(counter.textContent)).to.be.greaterThan(currentCounterNum);
  });
});
