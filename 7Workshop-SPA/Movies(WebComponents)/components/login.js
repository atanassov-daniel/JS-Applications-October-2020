import {
    html,
    render
} from 'https://unpkg.com/lit-html?module';
import {
    login
} from '../services/authServices.js';

const template = (ctx) => html `
    <form class="text-center border border-light p-5" @submit=${ctx.onSubmit}>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>
`;

export default class Register extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    onSubmit(e) {
        e.preventDefault();

        const [email, password] = [...e.target.querySelectorAll('input')].map(el => el.value);

        if ([email, password].some(el => el.trim() === '')) {
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

        login(email, password)
            .then(email => {
                notify(`Successful Login`, 'success');
                location.pathname = '/';
            })
            .catch(err => notify(`Couldn't be logged in - ${err.message}`));
    }

    render() {
        render(template(this), this); // this points to the current component/element
        // , {eventContext:this}
    }
}