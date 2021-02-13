import {
    html,
    render
} from 'https://unpkg.com/lit-html?module';
/* import {
    html,
    render
} from '../node_modules/lit-html/lit-html.js'; */
import {
    handleAuthPages
} from '../services/validatePage403.js';
import {
    getAuthData,
    register
} from '../services/authServices.js';

const template = (ctx) => html `
    <navigation-component></navigation-component>

    <form class="text-center border border-light p-5" @submit=${ctx.onSubmit}>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword"
                value="">
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
`;

export default class Register extends HTMLElement {
    /* connectedCallback() {
        this.render({
            onRegister(e) {
                e.preventDefault();
                console.log('register submit');
            }
        });
    }

    render(ctx) {
        render(template(ctx), this); // this points to the current component/element
    } */

    connectedCallback() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();

            this.render();
        });
        // this.render();
    }

    onSubmit(e) {
        e.preventDefault();

        const [email, password, repeatPassword] = [...e.target.querySelectorAll('input')].map(el => el.value);
        console.log([email, password, repeatPassword]);

        if ([email, password, repeatPassword].some(el => el.trim() === '')) {
            notify(`Please fill in all the fields!`);
            return;
        }

        if (email.match(/\S+@\S+\.\S+/) === null) {
            notify('The email address is invalid!');
            return;
        }

        if (password.length < 6) {
            notify(`Password should be at least 6 characters long!`);
            return;
        }

        if (password !== repeatPassword) {
            notify(`Passwords don't match!`);
            return;
        }

        register(email, password)
            .then(email => {
                notify('Successful registration', 'success');
                location.pathname = '/';
            })
            .catch(err => notify(`Couldn't be registered - ${err.message}`));
    }

    render() {
        handleAuthPages(location.pathname, this.user, this);
        // .then();
        render(template(this), this); // this points to the current component/element
        // , {eventContext:this}
    }
}