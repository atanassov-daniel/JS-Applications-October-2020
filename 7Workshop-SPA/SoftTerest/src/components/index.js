import '../../styles/common.css';

import NavBarComponent from './navBar';
import HomeComponent from './home';
import RegisterComponent from './register';
import LoginComponent from './login';

customElements.define('nav-bar', NavBarComponent);
customElements.define('home-comp', HomeComponent);
customElements.define('register-comp', RegisterComponent);
customElements.define('login-comp', LoginComponent);