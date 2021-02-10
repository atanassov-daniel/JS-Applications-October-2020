import {
    html,
    render
} from 'https://unpkg.com/lit-html?module';

import {
    getAuthData
} from '../services/authServices.js';
import {
    navFunc
} from './navFunc.js';

const template = (ctx) => html `
    ${navFunc(ctx.user)}

    <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
        <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
            class="img-fluid" alt="Responsive image">
        <h1 class="display-4">Movies</h1>
        <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
    </div>
    <!-- декларирали сме си movies component-a, kойто искаме да вкараме в темплейта на home => html'<movies-component></movies-component>' -->
    ${ctx.user.isAuthenticated ? html`<movies-component></movies-component>`: ''}
`;

// movies не му е грижа за това, че е специално за логнати юзъри, home-a в някакъв смисъл се грижи за това нещо

export default class Home extends HTMLElement {
    connectedCallback() {
        this.user = getAuthData();

        this.render();

        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    render() {
        // this.user = getAuthData();

        // render(template(getAuthData()), this); // this points to the current component/element
        console.log(this.user);
        render(template(this), this); // this points to the current component/element
    }
}