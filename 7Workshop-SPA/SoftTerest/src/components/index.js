import '../../styles/common.css';

import NavBarComponent from './navBar';
import NotFoundComponent from './not-found';
import ProfilePageComponent from './profile-page';
import HomeComponent from './home';
import RegisterComponent from './register';
import LoginComponent from './login';
import CreateIdeaComponent from './create-idea';
import IdeaCardComponent from './idea-card';
import DashboardComponent from './dashboard';
import DetailsComponent from './details';
import ForbiddenPageComponent from './forbidden';

customElements.define('nav-bar', NavBarComponent);
customElements.define('forbidden-page', ForbiddenPageComponent);
customElements.define('not-found', NotFoundComponent);
customElements.define('home-comp', HomeComponent);
customElements.define('register-comp', RegisterComponent);
customElements.define('login-comp', LoginComponent);
customElements.define('create-idea', CreateIdeaComponent);
customElements.define('idea-card', IdeaCardComponent);
customElements.define('dashboard-comp', DashboardComponent);
customElements.define('idea-details', DetailsComponent);
customElements.define('profile-page', ProfilePageComponent);