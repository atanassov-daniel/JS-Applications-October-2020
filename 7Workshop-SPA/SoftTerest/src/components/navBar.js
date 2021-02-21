import {
    html,
    render
} from 'lit-html';

const template = (ctx) => html `
    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
        <div class="container">
            <a class="navbar-brand" href="/">
                <img src="./images/idea.png" alt="Go to Home Page">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- <div class="collapse show navbar-collapse" id="navbarResponsive"> -->
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                ${ctx.isAuthenticated
                    ? html`
                        <li class="nav-item active">
                        <a class="nav-link" href="">Dashboard</a>
                        </li>
                        <li class="nav-item active">
                        <a class="nav-link" href="">Create</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/logout">Logout</a>
                        </li>
                    ` : html`
                        <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                        </li>
                    `
                }
            </ul>
            </div>
        </div>
    </nav>
`;

export default class NavBarComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        render(template({isAuthenticated: false}), this);
    }
}