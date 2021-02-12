import {
    Router
} from 'https://unpkg.com/@vaadin/router';
/* import {
    html,
    render
} from 'https://unpkg.com/lit-html?module'; */
import {
    html,
    render
} from '../node_modules/lit-html/lit-html.js';
import {
    handleAuthPages
} from '../services/validatePage403.js';
import {
    getAuthData
} from '../services/authServices.js';
import {
    getOneMovie,
    likeMovie,
    deleteMovie
} from '../services/movieServices.js';

const getMovie = async (key, email) => {
    let movieData = await getOneMovie(key);

    if (movieData === null) {
        // render(html `<not-found></not-found>`, this);
        return null;
    }

    const likes = Object.values(movieData.likes || {});
    const hasAlreadyLiked = likes.includes(email);
    const likesCount = likes.length;

    Object.assign(movieData, {
        hasAlreadyLiked,
        likesCount
    });

    return movieData;
};

const template = ({
    movieData = {},
    user = {},
    onLike,
    onDelete
}) => html `
    <navigation-component></navigation-component>
    
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movieData.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${movieData.imageUrl}"
                    alt="${movieData.title}">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movieData.description}</p>
                ${movieData._creator === user.email
                    ? html`
                        <a class="btn btn-danger" @click=${onDelete}>Delete</a>
                        <a class="btn btn-warning" href="${location.pathname}/edit">Edit</a>
                    ` : html`
                        ${movieData.hasAlreadyLiked
                            ? html`<span class="enrolled-span">Liked ${movieData.likesCount}</span></span>`
                            : html`<a class="btn btn-primary" @click=${onLike}>Like</a>` 
                        }
                    `
                }
            </div>
        </div>
    </div>
`;

export default class MovieDetails extends HTMLElement {
    constructor() {
        super();

        this.user = getAuthData();
    }

    connectedCallback() {
        const key = this.location.params.key; // this.location is comletely different from window.location, it's part of the component, given by the Vaadin Router

        this.render();

        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    onLike(e) {
        likeMovie(this.location.params.key, this.user.email)
            .then(data => this.render());
    }

    onDelete(e) {
        if (this.movieData._creator !== this.user.email) {
            alert('The movie couldn\'t be deleted');
            return;
        }

        deleteMovie(this.location.params.key)
            .then(data => Router.go('/'));
    }

    render() {
        getMovie(this.location.params.key, this.user.email)
            .then(movieData => {
                if (movieData === null) {
                    render(html `<not-found></not-found>`, this);
                    return;
                }

                this.movieData = movieData;

                handleAuthPages(location.pathname, this.user, this)
                    .then();

                render(template(this), this, {
                    eventContext: this
                });
            });
    }
}