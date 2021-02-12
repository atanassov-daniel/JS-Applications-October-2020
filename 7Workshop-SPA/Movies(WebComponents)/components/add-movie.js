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
    addMovie
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

const template = (onSubmit) => html `
    <navigation-component></navigation-component>

    <form class="text-center border border-light p-5" @submit=${onSubmit}>
        <h1>Add Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Title" name="title" value="">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Description" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
`;

export default class AddMovie extends HTMLElement {
    onSubmit(e) {
        e.preventDefault();

        let [title, description, imageUrl] = [...document.querySelector('form').querySelectorAll('.form-control')].map(el => el.value);

        let isValid = validateInputFieldsAreNotEmpty(title, description, imageUrl);
        if (isValid === false) return;

        addMovie({
                title,
                description,
                imageUrl,
                _creator: this.user.email
            })
            .then(data => Router.go(`/`));
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
        handleAuthPages(location.pathname, this.user, this);
        // .then();
        render(template(this.onSubmit), this, {
            eventContext: this
        });
    }
}