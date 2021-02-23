import '../../styles/login.css';
import {
    Router
} from '@vaadin/router';
import {
    html,
    render
} from 'lit-html';
import {
    getAuthData,
    register
} from '../services/authService';

const template = (onSubmit) => html `
    <nav-bar></nav-bar>
    
    <div class="container home wrapper  my-md-5 pl-md-5">
        <div class="row-form d-md-flex flex-mb-equal ">
            <div class="col-md-4">
                <!-- <img class="responsive" src="../images/idea.png" alt=""> -->
                <img class="responsive" src="./images/idea.png" alt="">
            </div>
            <form class="form-user col-md-7" @submit=${onSubmit}>
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 font-weight-normal">Register</h1>
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
                <div class="form-label-group">
                    <label for="inputRepeatPassword">Repeat Password</label>
                    <input type="password" id="inputRepeatPassword" name="repeatPassword" class="form-control"
                    placeholder="Repeat Password" required="">
                </div>
                <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
                <div class="text-center mb-4">
                    <p class="alreadyUser"> Already have an account? Then just
                        <a href="/login">Log-In</a>!
                    </p>
                </div>
                <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
            </form>
        </div>
    </div>
`;

export default class RegisterComponent extends HTMLElement {
    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const [username, password, repeatPassword] = [...e.target.querySelectorAll('input')].map(el => el.value);

        if ([username, password, repeatPassword].some(el => el.trim() === '')) {
            alert(`Please fill in all the fields!`);
            return;
        }

        if (username.includes('@') === true) {
            alert('The username is invalid - it shouldn\'t include @');
            return;
        }

        if (password.length < 6) {
            alert(`Password should be at least 6 characters long!`);
            return;
        }

        if (password !== repeatPassword) {
            alert(`Passwords don't match!`);
            return;
        }

        register(username.concat("@softterest.bg"), password)
            .then(email => {
                Router.go('/');
            })
            .catch(err => alert(`Couldn't be registered - ${err.message}`));
    }

    render() {
        render(template(this.onSubmit), this);
    }
}