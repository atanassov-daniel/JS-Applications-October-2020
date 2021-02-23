import '../../styles/common.css';

import NavBarComponent from './navBar';
import NotFoundComponent from './not-found';
import HomeComponent from './home';
import RegisterComponent from './register';
import LoginComponent from './login';
import CreateIdeaComponent from './create-idea';

customElements.define('nav-bar', NavBarComponent);
customElements.define('not-found', NotFoundComponent);
customElements.define('home-comp', HomeComponent);
customElements.define('register-comp', RegisterComponent);
customElements.define('login-comp', LoginComponent);
customElements.define('create-idea', CreateIdeaComponent);