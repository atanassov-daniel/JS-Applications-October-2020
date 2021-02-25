import {
    html,
    render
} from 'lit-html';
import {
    getAuthData
} from '../services/authService';
import {
    getUsersIdeas
} from '../services/ideasService';

import image1 from '../../images/user.png';

const template = ({
    data: {
        ideasCount,
        ideasTitles
    },
    user: {
        email
    }
}) => html `
    <nav-bar></nav-bar>

    <div class="container home wrapper  my-md-5 pl-md-5">
        <div class="profile home-text col-md-6 text-center col-lg">
            <img class="profile-img" src="${image1}" />
            <div class="profile-info">
                <p>Username: <small>${email.replace('@softterest.bg', '')}</small></p>
                <p class="infoType">Has ${ideasCount} ideas =)</p>
                ${ideasCount > 0
                    ? ideasTitles.map(title => html`<p>${title}</p>`)
                    : html`<p>No ideas yet</p>`
                }
            </div>
        </div>
    </div>
`;

export default class NavBarComponent extends HTMLElement {
    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    render() {
        getUsersIdeas(this.user.uid)
            .then(data => {
                this.data = data;

                render(template(this), this, {
                    eventContext: this
                });
            });
    }
}