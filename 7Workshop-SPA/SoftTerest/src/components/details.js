import '../../styles/ideas.css';

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
import {
    getOneIdea,
    deleteIdea,
    likeIdea,
    commentIdea
} from '../services/ideasService';

const template = ({
    ideaData: {
        title,
        description,
        imageUrl,
        _creator,
        hasAlreadyLiked,
        likesCount,
        comments = []
    },
    user: {
        email
    },
    onDelete,
    onLike,
    onComment
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
            <p class="infoType">Likes: <large>${likesCount}</large></p>
            <p class="infoType">Comments:</p>
            <ul>
                ${ comments.length === 0
                    ? html`
                        <li class="comment">No comments yet :(</li>
                    `: comments.map(comment => html`
                        <li class="comment">${comment.creator} : ${comment.comment}</li>
                    `)
                }
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
                    <button type="submit" class="btn detb com-btn" @click=${onComment}>Comment</button>
                    ${ hasAlreadyLiked === false ? html`<a class="btn detb like-btn" @click=${onLike}>Like</a>` : `` }
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

    onLike(e) {
        e.preventDefault();

        let thisComponent = document.querySelector('idea-details');

        likeIdea(location.pathname.replace('/details/', ''), thisComponent.user.email.replace('@softterest.bg', ''))
            .then(data => thisComponent.render());
    }

    onComment(e) {
        e.preventDefault();

        const thisComponent = document.querySelector('idea-details');

        const username = thisComponent.user.email.replace('@softterest.bg', '');
        const comment = document.querySelector('textarea').value;

        commentIdea(location.pathname.replace('/details/', ''), username, comment)
            .then(data => {
                document.querySelector('textarea').value = '';

                thisComponent.render();
            })
            .catch(err => alert(`Couldn't comment - ${err.message}`));
    }

    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    render() {
        document.getElementById('loading-spinner').style.display = 'block';

        const key = this.location.params.key;
        getOneIdea(key)
            .then(ideaData => {
                if (ideaData === null) {
                    render(html `<not-found></not-found>`, this);
                    return;
                }

                handleAuthPages(location.pathname, this.user, this);

                const likes = Object.values(ideaData.likes || {});
                const hasAlreadyLiked = likes.includes(this.user.email.replace('@softterest.bg', ''));
                const likesCount = likes.length;

                this.ideaData = Object.assign(ideaData, {
                    hasAlreadyLiked,
                    likesCount,
                    comments: Object.values(ideaData.comments || {})
                });

                render(template(this), this, {
                    eventContext: this
                });
                document.getElementById('loading-spinner').style.display = 'none';
            });
    }
}