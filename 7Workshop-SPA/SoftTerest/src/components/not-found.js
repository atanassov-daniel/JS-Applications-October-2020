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
            <img class="responsive" src="https://i.pinimg.com/originals/ad/3b/15/ad3b151202adcc82aa1ca2dafa760a4f.gif" />
        </div>
        <div class="home-text col-md-7">
            <h2 class="featurette-heading">404 Page Not Found</h2>
            <p class="lead">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?</p>
            <p class="lead">Let's go <a class="btn-lg " href="/">home</a> and try from there.</p>
        </div>
    </div>
    <div class="bottom text-center">
        <a class="btn btn-secondary btn-lg " href="/">Home</a>
    </div>
    </div>
`;

export default class NotFoundComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        document.getElementById('loading-spinner').style.display = 'block';

        render(template(), this);
        document.getElementById('loading-spinner').style.display = 'none';
    }
}