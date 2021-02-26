import '../../styles/home.css';
import {
    html,
    render
} from 'lit-html';
import {
    Router
} from '@vaadin/router';
import {
    handleAuthPages
} from '../services/validatePage';
import {
    getAuthData
} from '../services/authService';

import image1 from "../../images/01.svg"; //! not to have to do this I could just copy the whole image folder into the dist manually and not have a problem with the paths
// console.log(image1); // '/images/01.svg'

const template = (ctx) => html `
    <nav-bar></nav-bar>
    
    <div class="container home wrapper  my-md-5 pl-md-5">
        <div class="d-md-flex flex-md-equal ">
            <div class="col-md-5">
                <!-- <img class="responsive" src="./images/01.svg" /> -->
                <img class="responsive" src="${image1}" />
            </div>
            <div class="home-text col-md-7">
                <h2 class="featurette-heading">Do you wonder if your idea is good?</h2>
                <p class="lead">Join our family =)</p>
                <p class="lead">Post your ideas!</p>
                <p class="lead">Find what other people think!</p>
                <p class="lead">Comment on other people's ideas.</p>
            </div>
        </div>
        <div class="bottom text-center">
            <a class="btn btn-secondary btn-lg " href="/register">Get Started</a>
        </div>
    </div>
`;

export default class HomeComponent extends HTMLElement {
    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    render() {
        document.getElementById('loading-spinner').style.display = 'block';

        if (this.user.isAuthenticated === true) {
            Router.go('/dashboard');
        } else {
            handleAuthPages(location.pathname, this.user, this);

            render(template(this), this);
            document.getElementById('loading-spinner').style.display = 'none';
        }
    }
}