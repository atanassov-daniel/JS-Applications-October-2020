// routes -> мапинг между routes и id-тата на tempaltes
// router -> на база rоute-a da зареди правилния контент вътре в страницата динамично
// navigate -> променя URL-a и съдържанието, което визуализираме

const routes = {
    // '': 'home-template',
    '/': 'home-template',
    '/home': 'home-template',
    '/home/': 'home-template',
    // '/home/': 'home-template',
    '/login': 'login-form-template',
    '/login/': 'login-form-template',
    // '/login/': 'login-form-template',
    '/register': 'register-form-template',
    '/register/': 'register-form-template',
    // '/register/': 'register-form-template',
    '/addMovie': 'add-movie-template',
    '/addMovie/': 'add-movie-template',
    // '/addMovie/': 'add-movie-template',
    '/details': 'movie-details-template',
    '/edit': 'edit-movie-template',
    '/forbidden': 'forbidden-template'
};

const validateAuthPages = async (path) => { // pass the key only if the page is '/edit/'
    const nonAuthPages = ['/login', '/login/', '/register', '/register/'];
    const authPages = ['/addMovie', '/addMovie/', '/logout'];

    const isAuthPage = path.startsWith('/details/') || path.startsWith('/edit/') ||
        authPages.includes(path);

    let {
        isAuthenticated,
        email
    } = authService.getAuthData();

    if (isAuthPage) {
        // if the page requires Auth, but the user isn't authorised, 'return false'
        if (isAuthenticated === false) {
            return false;
        } else {
            // if the user tries to edit an entry he isn't the creator of, 'return false'
            if (path.startsWith('/edit')) {
                let key = path.replace('/edit/', '');

                let movieDetails = await movieService.getOne(key);

                if (movieDetails._creator !== email) {
                    return false; // if the user shouldn't be able to edit the entry, 'return false'
                } else {
                    return true; // if he is the creator, all is well, so 'return true'
                }
            } else {
                return true; // if the person is Auth to view the page, 'return true'
            }
        }
    } else if (nonAuthPages.includes(path)) { // if the page is a non-authorized one
        // if the page is for non-Auth users, but the user is authorised, 'return false', for ex. for the login and register pages if the user has already logged in
        if (isAuthenticated === true) {
            return false;
        } else {
            return true;
        }
    }
};

const router = async (url) => { // loads the content corresponding to the current page
    // the function takes (fullPath)
    // let [path, id] = fullPath.split('/details/')
    let [fullPath, queryString] = url.split('?');
    /* let [path, id, param] = fullPath.split('/');
    path = '/' + path; */
    let path = fullPath;
    console.log(path);
    console.log(queryString);

    let app = document.getElementById('app');
    let templateData = authService.getAuthData();

    let isNotForbidden = await validateAuthPages(path);
    if (isNotForbidden === false) {
        path = '/forbidden';
    }

    if (path === '/logout') { // log the user out and navigate to the home page
        authService.logout('Successful logout!');
        showNotification();

        return navigate('/login'); // the fucntion will get called and return(stop the execution) so that the function doesn't later return to doing the bottom logic which won't be needed and will lead to an error
    } else if (path === '/' || path === '/home' || path === '/home/') {
        let searchText = queryString?.split('=')[1];

        let movies = await movieService.getAll();
        movies = movies?.filter(obj => !searchText || obj.title.toLowerCase().includes(searchText.toLowerCase())); //  ако searchText-a го няма, върни true => няма да гледа второто условие; ако го има, върни false => ще разчита на второто условие

        templateData.movies = movies;
    } else if (path.startsWith('/details/')) {
        let key = path.replace('/details/', '');
        path = '/details';

        let currentUserEmail = authService.getAuthData().email;

        let movieDetails = await movieService.getOne(key, currentUserEmail);
        // let isCreator = movieService.isCreator(movieDetails._creator, currentUserEmail);

        /* templateData = {
            ...templateData,
            ...movieDetails
        }; */
        Object.assign(templateData, movieDetails, {
                key // this assigns the key and its value too
            }, // { isCreator }

        );
        console.log(templateData);
    } else if (path.startsWith('/edit/')) {
        let key = path.replace('/edit/', '');
        path = '/edit';

        let movieDetails = await movieService.getOne(key);

        Object.assign(templateData, movieDetails, {
            key
        });
    }
    /*
    TODO
        else if (path.startsWith('/search')) {
            let searchText = path.replace('/search?', '');
            path = '/search';

            let movies = await movieService.getAll();
            movies = movies.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase()));

            templateData.movies = movies;
            templateData.searchQuery = searchText;
        }
    TODO
     */

    let templateId = routes[path];

    let templateHtml = document.getElementById(templateId);

    if (templateHtml === null) templateHtml = document.getElementById('page-not-found-template');

    let template = Handlebars.compile(templateHtml.innerHTML);

    app.innerHTML = template(templateData);
};

const navigate = (path) => { // changes the URL and calls the router(which will load the corresponding content)
    history.pushState({}, '', path); // change the URL

    router(path); // call the router
};