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
            <form class="form-idea col-md-5" @submit=${onSubmit.bind(this)}>
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
        console.log(this); //! with .bind(this) I think that it worked
        let [title, description, imageUrl] = [...document.querySelector('form').querySelectorAll('.form-control')].map(el => el.value);

        if ([title, description, imageUrl].some(el => el.trim() === '')) {
            alert("Please fill in all the required fields!");
            return;
        }

        createIdea({
                title,
                description,
                imageUrl,
                // _creator: this.user.email
                _creator: document.querySelector('create-idea').user.email
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
        console.log('%c render start', 'color: yellow');
        console.log(this);
        console.log('%c render end', 'color: red');
        
        render(template(this.onSubmit), this, {
            eventContext: this
        });
    }
}