import {
    html,
    render,
    directive
} from 'https://unpkg.com/lit-html?module';
import {
    getAuthData
} from '../services/authServices.js';
import {
    getOneMovie,
    likeMovie
} from '../services/movieServices.js';

// най-добре е да си направим папка directives и да си импортваме всяка една директива, но в случая ще се използваме само една и само тук
// подаваме curry function
// направено е по този начин с чисто оптимизационна цел
// const likeDirective = directive(() => (part) => {});

// const template = ({title,imageUrl,description,likesCount}) => html `
const template = ({
    movieData = {},
    user = {},
    onLike
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

        getOneMovie(key)
            .then(movieData => {
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
        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    onLike(e) {
        console.log([this.location.params.key, this.user.email]);
        // console.log(e.currentTarget.parentElement.parentElement.parentElement.parentElement.user); -> not to have to do this, ↓, when invoking render() a options object ahs to be added -> `, { eventContext: this }`
        likeMovie(this.location.params.key, this.user.email)
            .then(data => {
                getOneMovie(this.location.params.key)
                    .then(movieData => {
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


                this.render();
            });
    }

    render() {
        // render(template(this.movieData), this);
        render(template(this), this, {
            eventContext: this
        });
    }
}