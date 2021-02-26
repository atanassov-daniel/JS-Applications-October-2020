import '../../styles/login.css';
import {
    Router
} from '@vaadin/router';
import {
    html,
    render
} from 'lit-html';
import {
    handleAuthPages
} from '../services/validatePage';
import {
    getAuthData,
    login
} from '../services/authService';

const template = (onSubmit) => html `
    <nav-bar></nav-bar>
    
    <div class="container home wrapper  my-md-5 pl-md-5">
        <div class="row-form d-md-flex flex-mb-equal ">
            <div class="col-md-4">
                <!-- <img class="responsive" src="../images/idea.png" alt=""> -->
                <!-- why did it even work the above way -->
                <img class="responsive" src="/images/idea.png" alt="">
            </div>
            <form class="form-user col-md-7" @submit=${onSubmit}>
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 font-weight-normal">Login</h1>
                </div>
                <div class="form-label-group">
                    <label for="inputUsername">Username</label>
                    <input type="text" id="inputUsername" name="username" class="form-control" placeholder="Username" required=""
                    autofocus="">
                </div>
                <div class="form-label-group">
                    <label for="inputPassword">Password</label>
                    <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password"
                    required="">
                </div>
                <div class="text-center mb-4 text-center">
                    <button class="btn btn-lg btn-dark btn-block" type="submit">Sign In</button>
                    <p class="alreadyUser"> Don't have account? Then just
                    <a href="/register">Sign-Up</a>!
                    </p>
                </div>
                <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
            </form>
        </div>
    </div>
`;

export default class LoginComponent extends HTMLElement {
    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const [username, password] = [...e.target.querySelectorAll('input')].map(el => el.value);

        if ([username, password].some(el => el.trim() === '')) {
            alert(`Please fill in all the fields!`);
            return;
        }

        if (username.includes('@') === true) {
            alert('The email address is invalid - it shouldn\'t include a @');
            return;
        }

        if (password.length < 6) {
            alert(`Password should be at least 6 characters long!`);
            return;
        }

        login(username.concat("@softterest.bg"), password)
            .then(email => {
                Router.go('/dashboard');
            })
            .catch(err => alert(`Couldn't be logged in - ${err.message}`));
    }

    render() {
        document.getElementById('loading-spinner').style.display = 'block';
        handleAuthPages(location.pathname, this.user, this);

        render(template(this.onSubmit), this);
        document.getElementById('loading-spinner').style.display = 'none';
    }
}