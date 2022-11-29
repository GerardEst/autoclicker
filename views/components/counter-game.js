import {LitElement, css, html} from 'lit';
import * as state from '../../src/state.js'
import '../components/custom-button'

export class counteregame extends LitElement {
    static styles = css`
        :host{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        p{
            font-size: 2rem;
        }
    ` 
    
    static properties = {
        // Les opcions que podem donar a les propietats estan explicades aqui:
        // https://lit.dev/docs/components/properties/#property-options
        counter: { type: Number }
    }
    constructor() {
        super()
        this.counter = 0
        this.intervals = []
        this.upgrades = 0
        this.baseCost = 5
        this.cost = this.baseCost
        this.speed = 1000
        this.player = state.getCurrentPlayer()
    }

    render() {
        return html`
            <p>${this.counter}</p>
            <custom-button @click="${this._increment}">Add</custom-button>
            ${this.counter >= this._cost()
                ? html`<custom-button @click="${this._buyIncrement}">Buy for ${this._cost()}</custom-button>`
                : html`<custom-button disabled>Buy for ${this._cost()}</custom-button>`
            }
            <p>Increments: ${this.upgrades}</p>
        `;
    }

    _increment() {
        this.counter++;

        // No sé si alterar l'estat des de cualsevol lloc... Suposo que no passa res no?
        state.alterPlayer(this.player, 'points', this.counter)
    }

    _buyIncrement() {
        this.counter -= this._cost()

        this._createNewInterval()
        this.upgrades++

        state.alterPlayer(this.player, 'upgrades', this.upgrades)
    }

    _createNewInterval() {
        // Hi havia el tema que vaig pensar d'anar agrupant incrementadors per no rebentar i tenir-ne 200 alhora
        // que suposo que afectarien al rendiment a la llarga
        const interval = setInterval(() => {
            this._increment()
        }, this.speed)
        this.intervals.push(interval)
    }

    _cost() {
        return this.baseCost + this.baseCost * this.upgrades
    }

    // Aqui dins podria millorar la cosa una miqueta per fer-ho mes entenedor
    connectedCallback() {
        super.connectedCallback()

        let allPlayers = state.getAllPlayers()

        if (allPlayers[this.player]) {
            let player = state.getPlayer(this.player)

            this.counter = player.points
            this.upgrades = player.upgrades

            // Iniciem tots els intervals (APARTAR AIXO D'AQUI)
            let upgrades = state.getPlayer(this.player).upgrades
            for (let i = 0; i < upgrades; i++){
                this._createNewInterval()
            }
        } else {
            state.addNewPlayer(this.player)
        }

    }
    disconnectedCallback() {
        super.disconnectedCallback()

        // Matem tots els intervals (APARTAR AIXO D'AQUI)
        this.intervals.forEach(interval => {
            clearInterval(interval)
        })
        this.intervals = []

        // Aqui hauriem de treure també el currentPlayer
        state.clearCurrentPlayer()
  }
}

customElements.define('counter-game', counteregame);
