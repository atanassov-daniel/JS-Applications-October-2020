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
    editMovie
} from '../services/movieServices.js';

const validateInputFieldsAreNotEmpty = (...values) => {
    for (const value of values) {
        if (value.trim() === '') {
            alert("Please fill in all the required fields!");
            return false;
        }
    }
    return true;
};

const template = ({
    onSubmit,
    movieData: {
        title,
        description,
        imageUrl
    }
}) => html `
    <navigation-component></navigation-component>

    <form class="text-center border border-light p-5" @submit=${onSubmit}>
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" value=${title} name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description">${description}</textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" value=${imageUrl} name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
`;

export default class EditMovie extends HTMLElement {
    onSubmit(e) {
        e.preventDefault();

        let [title, description, imageUrl] = [...document.querySelector('form').querySelectorAll('.form-control')].map(el => el.value);

        let isValid = validateInputFieldsAreNotEmpty(title, description, imageUrl);
        if (isValid === false) return;

        editMovie(this.location.params.key, {
                title,
                description,
                imageUrl,
            })
            .then(data => Router.go(location.pathname.replace('/edit/', '').replace('/edit', '')));
        // .then(data => Router.go(`/details/${data.name}`));
    }

    connectedCallback() {
        this.user = getAuthData();

        this.render();

        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    render() {
        getOneMovie(this.location.params.key)
            .then(movieData => {
                this.movieData = movieData;

                /* handleAuthPages(location.pathname, this.user, this)
                    .then(); */
                render(template(this), this, {
                    eventContext: this
                });
            });

    }
}