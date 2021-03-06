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
    createIdea
} from '../services/ideasService';

import image1 from "../../images/creativity_painted_face.jpg";

const template = (onSubmit) => html `
    <nav-bar></nav-bar>
    
    <div class="container home wrapper  my-md-5 pl-md-5">
        <div class=" d-md-flex flex-mb-equal ">
            <div class="col-md-6">
                <!-- <img class="responsive-ideas create" src="../images/creativity_painted_face.jpg" alt=""> -->
                <img class="responsive-ideas create" src="${image1}" alt="">
            </div>
            <form class="form-idea col-md-5" @submit=${onSubmit}>
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
                </div>
                <div class="form-label-group">
                    <label for="ideaTitle">Title</label>
                    <input type="text" id="title" name="title" class="form-control" placeholder="What is your idea?" required=""
                    autofocus="">
                </div>
                <div class="form-label-group">
                    <label for="ideaDescription">Description</label>
                    <textarea type="text" name="description" class="form-control" placeholder="Description"
                    required=""></textarea>
                </div>
                <div class="form-label-group">
                    <label for="inputURL">Add Image</label>
                    <input type="text" id="imageURl" name="imageURL" class="form-control" placeholder="Image URL" required="">
                </div>

                <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

                <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
            </form>
        </div>
    </div>
`;

export default class CreateIdeaComponent extends HTMLElement {
    onSubmit(e) {
        e.preventDefault();

        console.log(this); // it pints to the form

        let [title, description, imageUrl] = [...document.querySelector('form').querySelectorAll('.form-control')].map(el => el.value);

        if ([title, description, imageUrl].some(el => el.trim() === '')) {
            alert("Please fill in all the required fields!");
            return;
        }

        if (title.length < 6) {
            alert("Title should be at least 6 characters long!");
            return;
        }

        if (description.length < 6) {
            alert("Title should be at least 6 characters long!");
            return;
        }

        if (imageUrl.startsWith('http://') === false && imageUrl.startsWith('https://') === false) {
            alert("The URL of the image should start with http:// or https://");
            return;
        }

        createIdea({
                title,
                description,
                imageUrl,
                // _creator: this.user.email
                _creator: document.querySelector('create-idea').user.email
            }, document.querySelector('create-idea').user.uid)
            .then(data => Router.go(`/dashboard`));
    }

    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    render() {
        // console.log('%c render start', 'color: yellow');
        // console.log(this);
        // console.log('%c render end', 'color: red');
        document.getElementById('loading-spinner').style.display = 'block';
        handleAuthPages(location.pathname, this.user, this);

        render(template(this.onSubmit), this);
        document.getElementById('loading-spinner').style.display = 'none';
        // ,{ eventContext: this }
    }
}