//! console.log(this.location.search);
//TODO move the firebase.onAuthStateChanged() here and reload the page on a change; the render() function will have to do 'this.user = getAuthdata()' too



import {
    Router
} from 'https://unpkg.com/@vaadin/router';

import {
    logout
} from './services/authServices.js';

import Navigation from "./components/navigation.js";
import Home from "./components/home.js";
import Register from "./components/register.js";
import Login from "./components/login.js";
import Movies from "./components/movies.js";
import MovieCard from "./components/movie-card.js";
import MovieDetails from "./components/movie-details.js";
import EditMovie from "./components/edit-movie.js";
import AddMovie from "./components/add-movie.js";
import NotFound from "./components/not-found.js";
import Forbidden from "./components/forbidden.js";

customElements.define('navigation-component', Navigation);
customElements.define('forbidden-component', Forbidden);
customElements.define('home-component', Home);
customElements.define('register-component', Register);
customElements.define('login-component', Login);
customElements.define('movies-component', Movies);
customElements.define('movie-card', MovieCard);
customElements.define('movie-details', MovieDetails);
customElements.define('edit-movie-component', EditMovie);
customElements.define('add-movie-component', AddMovie);
customElements.define('not-found', NotFound);

const root = document.getElementById('root');
const router = new Router(root);

router.setRoutes([{
        path: '/',
        component: 'home-component'
    },
    {
        path: '/home',
        redirect: '/'
    },
    {
        path: '/register',
        component: 'register-component'
    },
    {
        path: '/login',
        component: 'login-component'
    },
    {
        path: '/add-movie',
        component: 'add-movie-component'
    },
    {
        path: '/details/:key',
        component: 'movie-details'
    },
    {
        path: '/details/:key/edit',
        component: 'edit-movie-component'
    },
    {
        path: '/logout',
        action: (context, commands) => {
            logout()
                .then(() => {
                    notify(`Successful logout`, 'success');

                    // location.pathname = '/';
                })
                .catch(err => notify(`Couldn't be logged out - ${err.message}`));

            return commands.redirect('/login');
        }
    },
    {
        path: '(.*)',
        component: 'not-found'
    },

    /* {
        path: '/users/:user',
        component: 'x-user-profile'
    }, */
]);


/* firebase.auth().onAuthStateChanged((user) => {
    console.log('onAuthStateChanged');
    Router.go(location.href.replace(location.origin, ''));
}); */
// console.log(location.href.replace('http://localhost:3000', ''));