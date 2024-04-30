//https://open-wc.org/docs/testing/testing-package/

import {html, fixture, expect, aTimeout} from '@open-wc/testing';

import '../views/components/counter-game.js';

describe('Counter game flow -> click and buy upgrade', async () => {
  const el = await fixture(html`<counter-game></counter-game>`);
  const counter = el.shadowRoot.querySelector('.counter__num');
  const money = el.shadowRoot.querySelector('.money__num');
  const buyButton = el.shadowRoot.querySelector('buy-button');
  const sellButton = el.shadowRoot.querySelector('custom-button#sellFish');

  it('Counter starts in 0', () => {
    expect(Number(counter.textContent)).to.equal(0);
  });

  it('Counter +1 when click Row', async () => {
    const rowButton = el.shadowRoot.querySelector('custom-button#toFish');
    await rowButton.click();

    expect(Number(counter.textContent)).to.equal(1);
  });

  it('Throw the rod upgrades the counter', async () => {
    const rowButton = el.shadowRoot.querySelector('custom-button#toFish');

    for (let i = 0; i < 49; i++) {
      await rowButton.click();
    }

    expect(Number(counter.textContent)).to.equal(50);
  });

  it('Sell fish makes counter go to 0', async () => {
    await sellButton.click();

    expect(Number(counter.textContent)).to.equal(0);
  });

  it('Buy upgrade makes money go down by cost', async () => {
    const upgradeCost = 50;
    const currentMoney = Number(money.textContent);
    await buyButton.click();

    expect(Number(money.textContent)).to.equal(currentMoney - upgradeCost);
  });

  it('Buy upgrade makes counter grow automatically', async () => {
    const currentCounterNum = Number(counter.textContent);
    await aTimeout(300);

    expect(Number(counter.textContent)).to.be.greaterThan(currentCounterNum);
  });
});
