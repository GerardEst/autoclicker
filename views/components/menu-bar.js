import {LitElement, css, html} from 'lit';
import {reset} from '../resetcss.js';
import './intern-link'
import * as state from '../../src/state.js'

export class menubar extends LitElement {

    static styles = [
        reset,
        css`
        .menu {
            display: flex;
            justify-content: space-between;
        }
        `,
    ];

    render() {
        return html`
        <div class="menu">
            <div><p>Hola ${state.getCurrentPlayer()}</p></div>
            <intern-link href="/">Exit</intern-link>
        </div>
        `;
    }
    
}

customElements.define('menu-bar', menubar);
