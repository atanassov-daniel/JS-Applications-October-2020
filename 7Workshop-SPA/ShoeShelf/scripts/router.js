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
    '/edit': 'edit-shoe-template',
    '/forbidden': 'forbidden-template',
};

// offerCreator, currentUserEmail
// details, edit, delete
const validateAuthPages = async (path, authData) => { // pass the key only if the page is '/edit/'
    // the HomePage content is handled by the template itself, so this function doesn't need to take care of it
    const nonAuthPages = ['/login', '/login/', '/register', '/register/'];
    const authPages = ['/create-offer', '/create-offer/', '/logout'];

    const isAuthPage = path.startsWith('/details/') || authPages.includes(path); //  || path.includes('/edit') || path.includes('/delete') 

    if (isAuthPage) {
        // if the page requires Auth, but the user isn't authorised, 'return false'
        if (authData.isAuthenticated === false) {
            return false;
        } else {
            // if the user tries to edit/delete an entry he isn't the creator of (as by writing '/edit' or '/delete' after the current pathname), 'return false'
            if (path.includes('/edit') || path.includes('/delete')) {
                let key = path.replace('/details/', '').replace('/edit/', '').replace('/edit', '').replace('/delete/', '').replace('/delete', '');

                let shoeDetails = await shoeService.getOne(key);

                if (shoeDetails._creator !== authData.email) {
                    return false; // if the user shouldn't be able to edit/delete the entry, 'return false'
                } else {
                    return true; // if he is the creator, all is well, so 'return true'
                }
            } else {
                return true; // if the person is Auth to view the page, 'return true'
            }
        }
    } else if (nonAuthPages.includes(path)) { // if the page is a non-authorized one
        // if the page is for non-Auth users, but the user is authorised, 'return false', for ex. for the login and register pages if the user has already logged in
        if (authData.isAuthenticated === true) {
            return false;
        } else {
            return true;
        }
    }
};

const router = async (path) => {
    console.log(path);
    let app = document.getElementById('app');

    let templateData = authService.getAuthData();
    // console.log(`router -> ${JSON.stringify(templateData)}`);

    let isAllowed = await validateAuthPages(path, templateData);
    if (isAllowed === false) {
        path = '/forbidden';
    }

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
        } else if (path.includes('/delete')) {
            id = id.replace('/delete/', '').replace('/delete', '');
            // path = `/details/${id}`;
            // console.log('on delete');
            shoeService.delete(id)
                .then(res => res === null ? navigate('/') : alert(`Couldn't be deleted! Please try again later`));
        } else {
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

    app.querySelector('div.mainbox') !== null ? document.body.classList.add('special-page') :
        document.body.classList.remove('special-page'); // so that the CSS works correctly
};

const navigate = (path) => {
    history.pushState({}, '', path);

    router(path);
};

export {
    navigate
};