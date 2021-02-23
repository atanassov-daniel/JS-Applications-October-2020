import {
    Router
} from '@vaadin/router';
import 'bootstrap/dist/css/bootstrap.css';
import '../public/index.html';
import './components';
import {
    logout
} from './services/authService';
/* 
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCG1dtriC2bT9a-pQ3D0grbd9rDPxFw6LU",
    authDomain: "softterest-c5d88.firebaseapp.com",
    projectId: "softterest-c5d88",
    storageBucket: "softterest-c5d88.appspot.com",
    messagingSenderId: "402953678338",
    appId: "1:402953678338:web:2ea12d2da88eb26776811b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig); */

const rootElement = document.getElementById('root');
const router = new Router(rootElement);

router.setRoutes([ //
    {
        path: '/',
        component: 'home-comp'
    },
    {
        path: '/login',
        component: 'login-comp'
    },
    {
        path: '/register',
        component: 'register-comp'
    },
    {
        path: '/logout',
        action: (context, commands) => {
            logout()
                .then(() => {
                    alert(`Successful logout`);
                })
                .catch(err => alert(`Couldn't be logged out - ${err.message}`));

            return commands.redirect('/login');
        }
    },
    {
        path: '/create-idea',
        component: 'create-idea'
    },
    /* {
        path: '/details/:id',
        component: 'idea-details'
    }, */
    {
        path: '(.*)',
        component: 'not-found'
    },
]);