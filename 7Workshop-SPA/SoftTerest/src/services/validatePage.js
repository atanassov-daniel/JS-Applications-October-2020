import {
    html,
    render
} from 'lit-html';

export async function handleAuthPages(path, authData, componentThis) {
    const validateAuthPages = async (path, authData) => { // pass the key only if the page is '/edit/'
        // the HomePage content is handled by the template itself, so this function doesn't need to take care of it
        const nonAuthPages = ['/login', '/login/', '/register', '/register/', '/'];
        const authPages = ['/create-idea', '/create-idea/', '/dashboard', '/dashboard/', '/profile', '/profile/'];
        
        const isAuthPage = path.startsWith('/details/') || authPages.includes(path); //  || path.includes('/edit') || path.includes('/delete') 

        if (isAuthPage) {
            // if the page requires Auth, but the user isn't authorised, 'return false'
            if (authData.isAuthenticated === false) {
                return false;
            } else {
                return true; // if the person is Auth to view the page, 'return true'
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
        render(html `<forbidden-page></forbidden-page>`, componentThis);
    }
}