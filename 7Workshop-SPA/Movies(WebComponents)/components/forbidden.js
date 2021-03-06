import {
    html,
    render
} from 'https://unpkg.com/lit-html?module';
// import { html, render } from '../node_modules/lit-html/lit-html.js';

const template = () => html `
    <navigation-component></navigation-component>

    <div class="mainbox" id="404-not-found">
        <div class="err">4</div>
        <div class="err2">0</div>
        <div class="err3">3</div>
        <div class="msg">It appears you don't have permission to access this page! <br><br> <p>Let's go <a href="/">home</a> and try from there. <br> Alternatively, if you're a guest, please <a href="/login">login</a> or <a href="/register">register</a> and then try again!</p></div>
    </div>
    <!-- <link rel="stylesheet" href="/static/css/404.css"> -->
    <style>
        body {
            background-color: #95c2de;
        }

        .mainbox {
            background-color: #95c2de;
            margin: auto;
            height: 600px;
            width: 600px;
            position: relative;
        }

        .err {
            color: #ffffff;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 11rem;
            position: absolute;
            left: 20%;
            top: 4%;
        }

        .err2 {
            color: #ffffff;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 11rem;
            position: absolute;
            left: 42%;
            top: 4%;
        }

        .err3 {
            color: #ffffff;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 11rem;
            position: absolute;
            left: 64%;
            top: 4%;
        }

        .msg {
            text-align: center;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 1.6rem;
            position: absolute;
            left: 16%;
            top: 45%;
            width: 75%;
        }

        a {
            text-decoration: none;
            color: white;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
`;

export default class Forbidden extends HTMLElement {
    connectedCallback() {
        this.render();
        /* firebase.auth().onAuthStateChanged((user) => {
            this.user = getAuthData();
            //! trqbva da se opravi kato se logne user-a, tova maj 6te si se opravi ot samiq component, ot kojto e do6ul dotuk
            this.render();
        }); */
    }

    render() {
        render(template(), this); // this points to the current component/element
    }
}