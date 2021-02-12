/* import {
    html,
    render
} from 'https://unpkg.com/lit-html?module'; */
import { html, render } from '../node_modules/lit-html/lit-html.js';
import {
    getAuthData
} from '../services/authServices.js';

const template = ({
    isAuthenticated,
    email
}) => html `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <a class="navbar-brand text-light" href="/">Movies</a>
        <ul class="navbar-nav ml-auto">
            ${isAuthenticated ?
                html`
                    <li class="nav-item">
                        <a class="nav-link">Welcome, ${email}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/logout">Logout</a>
                    </li>
                ` : html`
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                `
            }
        </ul>
    </nav>`;

export default class Navigation extends HTMLElement {
    connectedCallback() {
        this.user = getAuthData();

        this.render();

        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    render() {
        render(template(this.user), this); // this points to the current component/element
    }
}