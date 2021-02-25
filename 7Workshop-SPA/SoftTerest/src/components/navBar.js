import {
    html,
    render
} from 'lit-html';
import {
    getAuthData,
    logout
} from '../services/authService';
import {
    Router
} from '@vaadin/router';

import image1 from '../../images/idea.png';

const template = ({
    user: {
        isAuthenticated,
        email
    },
    toggleNavBar,
    logout
}) => html `
    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
        <div class="container">
            ${isAuthenticated
                ? html`
                    <a class="navbar-brand" href="/dashboard">
                        <!-- <img src="./images/idea.png" alt="Go to Home Page"> -->
                        <img src="${image1}" alt="Go to Home Page">
                    </a>
                ` : html`
                    <a class="navbar-brand" href="/">
                        <!-- <img src="./images/idea.png" alt="Go to Home Page"> -->
                        <img src="${image1}" alt="Go to Home Page">
                    </a>
                `
            }
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" @click=${toggleNavBar}>
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- <div class="collapse show navbar-collapse" id="navbarResponsive"> -->
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                ${isAuthenticated
                    ? html`
                        <li class="nav-item active">
                            <a class="nav-link" href="/dashboard">Dashboard</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/create-idea">Create</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/profile">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="" @click=${logout}>Logout</a>
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
            </div>
        </div>
    </nav>
`;

export default class NavBarComponent extends HTMLElement {
    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    render() {
        render(template(this), this, {
            eventContext: this
        });
    }

    toggleNavBar(e) {
        e.preventDefault();

        document.getElementById('navbarResponsive').classList.toggle('show');
    }

    logout(e) {
        e.preventDefault();

        logout()
            .then(() => {
                alert(`Successful logout`);
                Router.go('/login');
            })
            .catch(err => alert(`Couldn't be logged out - ${err.message}`));
    }
}