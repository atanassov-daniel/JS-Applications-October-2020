import '../../styles/ideas.css';

import {
    html,
    render
} from 'lit-html';
import {
    Router
} from '@vaadin/router';
import {
    getAuthData
} from '../services/authService';
import {
    getOneIdea,
    deleteIdea
} from '../services/ideasService';

const template = ({
    ideaData: {
        title,
        description,
        imageUrl,
        _creator
    },
    user: {
        email
    },
    onDelete
}) => html `
    <nav-bar></nav-bar>

    <div class="container home some">
        <img class="det-img" src="${imageUrl}" />
        <div class="desc">
            <h2 class="display-5">${title}</h2>
            <!-- Dinner Recipe -->
            <p class="infoType">Description:</p>
            <p class="idea-description">${description}</p>
            <!-- There are few things as comforting as heaping bowl of pasta at the end of a long
            day. With so many easy pasta recipes out there, there's something for every palate to love. That's why pasta
            makes such a quick, easy dinner for your family—it's likely to satisfy everyone's cravings, due to its
            versatility. -->
            <p class="infoType">Likes: <large>2</large></p>
            <p class="infoType">Comments:</p>
            <ul>
                <li class="comment">John: I really like this idea :)</li>
                <li class="comment">No comments yet :(</li>
            </ul>
        </div>
        ${ _creator === email 
            ? html`
                <div class="text-center">
                    <a class="btn detb del-btn" @click=${onDelete}>Delete</a>
                </div>
            `: html`
                <form class="text-center">
                    <textarea class="textarea-det" name="newComment" placeholder="Type your comment here..."></textarea>
                    <button type="submit" class="btn detb com-btn">Comment</button>
                    <a class="btn detb like-btn">Like</a>
                </form>
        `}
    </div>
`;

export default class DetailsComponent extends HTMLElement {
    onDelete(e) {
        // e.preventDefault();
        deleteIdea(location.pathname.replace('/details/', ''))
            .then(data => Router.go('/dashboard'));
    }

    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    render() {
        const key = this.location.params.key;

        // getOneIdea(this.location.params.key)
        getOneIdea(key)
            .then(ideaData => {
                this.ideaData = ideaData;

                render(template(this), this, {
                    eventContext: this
                });
            });
    }
}