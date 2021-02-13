// offerCreator, currentUserEmail
// details, edit, delete
import {
    html,
    render
} from 'https://unpkg.com/lit-html?module';
/* import {
    html,
    render
} from '../node_modules/lit-html/lit-html.js'; */
import {
    getOneMovie
} from './movieServices.js';

export async function handleAuthPages(path, authData, componentThis) {
    const validateAuthPages = async (path, authData) => { // pass the key only if the page is '/edit/'
        // the HomePage content is handled by the template itself, so this function doesn't need to take care of it
        const nonAuthPages = ['/login', '/login/', '/register', '/register/'];
        const authPages = ['/add-movie', '/add-movie/', '/logout'];

        const isAuthPage = path.startsWith('/details/') || authPages.includes(path); //  || path.includes('/edit') || path.includes('/delete') 

        if (isAuthPage) {
            // if the page requires Auth, but the user isn't authorised, 'return false'
            if (authData.isAuthenticated === false) {
                return false;
            } else {
                // if the user tries to edit/delete an entry he isn't the creator of (as by writing '/edit' or '/delete' after the current pathname), 'return false'
                if (path.includes('/edit')) {
                    console.log('includes /edit/');
                    let key = path.replace('/details/', '').replace('/edit/', '').replace('/edit', '');
                    console.log(`key: ${key}`);
                    let movieDetails = await getOneMovie(key);

                    if (movieDetails._creator !== authData.email) {
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

    const isAllowed = await validateAuthPages(path, authData);
    if (isAllowed === false) {
        render(html `<forbidden-component></forbidden-component>`, componentThis);
    }
}