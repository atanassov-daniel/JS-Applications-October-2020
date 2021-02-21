import {
    Router
} from '@vaadin/router';
import 'bootstrap/dist/css/bootstrap.css';
import '../public/index.html';
import './components';

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
        path: '/details/:id',
        component: 'idea-details'
    },
]);