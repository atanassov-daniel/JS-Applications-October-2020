import {
    html,
    render
} from 'https://unpkg.com/lit-html?module';

import {
    logout,
    getAuthData
} from '../services/authServices.js';
import {
    navFunc
} from './navFunc.js';

const template = (authData) => html `
    ${navFunc(authData)}

    <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
        <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
            class="img-fluid" alt="Responsive image">
        <h1 class="display-4">Movies</h1>
        <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
    </div>
`;

export default class Home extends HTMLElement {
    connectedCallback() {
        this.render();

        firebase.auth().onAuthStateChanged((user) => {
            this.render();
        });
        /* logout()
            .then(() => {
                notify(`Successful registration`, 'success');
                location.pathname = '/';
            })
            .catch(err => notify(`Couldn't sign out - ${err.message}`)); */
    }

    render() {
        render(template(getAuthData()), this); // this points to the current component/element
    }
}