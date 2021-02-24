import '../../styles/dashboard.css';
import {
    html,
    render
} from 'lit-html';
import {
    getAuthData
} from '../services/authService';
import {
    getAllIdeas
} from '../services/ideasService';

// `<h1>No ideas yet! Be the first one :)</h1>`   ако го нямаше html`` пред html-a щеше да е просто текст с дефолт стайлинг, а не h1

const template = (ideas) => html `
    <nav-bar></nav-bar>

    <div id="dashboard-holder">
        ${ideas.length > 0 ? ideas.map(idea => html`<idea-card .ideaData=${idea}></idea-card>`) : html`<h1>No ideas yet! Be the first one :)</h1>`}
    </div>
`;

export default class DashboardComponent extends HTMLElement {
    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    render() {
        // loading
        getAllIdeas()
            .then(ideas => {
                // remove loading
                render(template(ideas), this);
            });
    }
}