// routes -> мапинг между routes и id-тата на tempaltes
// router -> на база rоute-a da зареди правилния контент вътре в страницата динамично
// navigate -> променя URL-a и съдържанието, което визуализираме

const routes = {
    // '': 'home-template',
    '/': 'home-template',
    '/home': 'home-template',
    // '/home/': 'home-template',
    '/login': 'login-form-template',
    // '/login/': 'login-form-template',
    '/register': 'register-form-template',
    // '/register/': 'register-form-template',
    '/addMovie': 'add-movie-template',
    // '/addMovie/': 'add-movie-template',
    '/details': 'movie-details-template',
    '/edit': 'edit-movie-template'
};

const router = async (path) => { // loads the content corresponding to the current page
    // the function takes (fullPath)
    // let [path, id] = fullPath.split('/details/')
    console.log(path);

    let app = document.getElementById('app');
    let templateData = authService.getAuthData();

    if (path === '/logout') { // log the user out and navigate to the home page
        authService.logout();

        return navigate('/login'); // the fucntion will get called and return(stop the execution) so that the function doesn't later return to doing the bottom logic which won't be needed and will lead to an error
    } else if (path === '' || path === '/' || path === '/home') {
        templateData.movies = await movieService.getAll();
    } else if (path.startsWith('/details/')) {
        let key = path.replace('/details/', '');
        path = '/details';

        let movieDetails = await movieService.getOne(key);

        let isCreator = movieService.isCreator(movieDetails._creator);
        /* templateData = {
            ...templateData,
            ...movieDetails
        }; */
        Object.assign(templateData, movieDetails, {
            key // this assignt the key and its value too
        }, {
            isCreator
        });
        console.log(templateData);
    } else if (path.startsWith('/edit/')) {
        let key = path.replace('/edit/', '');
        path = '/edit';

        let movieDetails = await movieService.getOne(key);

        Object.assign(templateData, movieDetails, {
            key
        });
    }

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