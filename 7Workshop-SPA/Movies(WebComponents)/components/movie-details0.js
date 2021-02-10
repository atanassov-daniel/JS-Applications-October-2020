import {
    html,
    render
} from 'https://unpkg.com/lit-html?module';
import {
    getAuthData
} from '../services/authServices.js';
import {
    getOneMovie
} from '../services/movieServices.js';

// const template = ({title,imageUrl,description,likesCount}) => html `
const template = ({
    movieData = {},
    user = {}
}) => html `
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
                        <a class="btn btn-danger" href="${location.pathname}/delete">Delete</a>
                        <a class="btn btn-warning" href="${location.pathname}/edit">Edit</a>
                    ` : html`
                        ${movieData.hasAlreadyLiked
                            ? html`
                                <span class="enrolled-span">Liked ${movieData.likesCount}</span></span>
                            ` : html`
                                <a class="btn btn-primary" href="${location.pathname}/like">Like</a>
                            ` 
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

        /* this.render();

         firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        }); */
    }

    connectedCallback() {
        const key = this.location.params.key; // this.location is comletely different from window.location, it's part of the component, given by the Vaadin Router
        getOneMovie(key)
            .then(movieData => {
                console.log(movieData.likes);
                const likes = Object.values(movieData.likes || {});
                const hasAlreadyLiked = likes.includes(this.user.email);
                const likesCount = likes.length;

                Object.assign(movieData, {
                    hasAlreadyLiked,
                    likesCount
                });

                this.movieData = movieData;
                // Object.assign(this, movieData) => render(template(this), this);

                this.render();
            });

        // this.render();
    }

    render() {
        // render(template(this.movieData), this);
        render(template(this), this);
    }
}