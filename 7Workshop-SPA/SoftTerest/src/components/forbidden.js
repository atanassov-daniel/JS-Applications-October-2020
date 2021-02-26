import '../../styles/common.css';
import '../../styles/home.css';
import {
    html,
    render
} from "lit-html";

const template = () => html `
    <nav-bar></nav-bar>
    
    <div class="container home wrapper  my-md-5 pl-md-5">
        <div class="d-md-flex flex-md-equal ">
            <div class="col-md-5">
                <img class="responsive" src="https://freefrontend.com/assets/img/403-forbidden-html-templates/403-Forbidden-HTML.gif" />
            </div>
            <div class="home-text col-md-7">
                <h2 class="featurette-heading">403 Forbidden</h2>

                <p class="lead">It appears you don't have permission to access this page!</p>
                <p class="lead">Let's go <a href="/">home</a> and try from there.</p>
                <p class="lead">Alternatively, if you're a guest, please <a href="/login">login</a> or <a href="/register">register</a> and then try again!</p>
            </div>
        </div>
        <div class="bottom text-center">
            <a class="btn btn-secondary btn-lg " href="/">Home</a>
            <!-- <a class="btn btn-secondary btn-lg " href="/login">Login</a>
            <a class="btn btn-secondary btn-lg " href="/register">Register</a> -->
        </div>
    </div>
`;

export default class ForbiddenComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        document.getElementById('loading-spinner').style.display = 'block';

        render(template(), this);
        document.getElementById('loading-spinner').style.display = 'none';
    }
}