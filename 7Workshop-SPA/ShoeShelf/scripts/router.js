import {
    authService
} from "./authService.js";
import {
    shoeService
} from "./shoeService.js";

const routes = {
    '/': 'home-template',
    '/home': 'home-template',
    '/home/': 'home-template',
    '/create-offer': 'create-offer-template',
    '/create-offer/': 'create-offer-template',
    '/details': 'shoe-details-template',
    '/register': 'register-template',
    '/register/': 'register-template',
    '/login': 'login-template',
    '/login/': 'login-template',
    '/edit': 'edit-shoe-template'

    // '/': '-template',
    // '/': '-template',
    // '/': '-template',
    // '/': '-template',
};

const router = async (path) => {
    console.log(path);
    let app = document.getElementById('app');

    let templateData = authService.getAuthData();
    // console.log(`router -> ${JSON.stringify(templateData)}`);

    if (['/', '/home', '/home/'].includes(path)) {
        if (templateData.isAuthenticated === true) Object.assign(templateData, {
            shoes: await shoeService.getAll()
        });

        console.log(templateData);
    } else if (path.startsWith('/details')) {
        let id = path.replace('/details/', '');

        if (path.includes('/edit')) {
            id = id.replace('/edit/', '').replace('/edit', '');

            path = '/edit';
        }
        /* else if (path.includes('/buy')) {
                   id = id.replace('/buy/', '').replace('/buy', '');

                   path = '/buy';
               } */
        else {
            path = '/details';
        }

        let movieData = await shoeService.getOne(id);

        templateData = {
            ...templateData,
            ...movieData,
            isCreator: movieData._creator === authService.getAuthData().email,
            key: id
        };

        let buyers = Object.values(templateData.buyers || {});

        if (!buyers) templateData.buyersCount = 0;
        else templateData.buyersCount = buyers.length;

        templateData.hasBoughtIt = buyers.includes(templateData.email);
        // buyers will be an assoc. rray with the emails, buyersCount is the length of the keys of that ass. array

        console.log(templateData);
    } else if (path.startsWith('/logout')) {
        firebase.auth().signOut().then(() => {
            // alert('Sign-out successful.');
            return navigate('/login');
        }).catch((error) => {
            alert(`Couldn't sign out - ${error.message}`);
        });
    }

    let templateId = routes[path];

    let templateHtml = document.getElementById(templateId);

    if (templateHtml === null) templateHtml = document.getElementById('page-not-found-template');

    let template = Handlebars.compile(templateHtml.innerHTML);

    app.innerHTML = template(templateData);
};

const navigate = (path) => {
    history.pushState({}, '', path);

    router(path);
};

export {
    navigate
};