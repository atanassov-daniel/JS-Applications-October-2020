// тук е кода, който искаме да се изпълни веднага при зареждането на страницата, еднократно, като eventListeners, eventHandlers, eвенти които искаме да закачим; искаме веднъж да се инициализират и повече не ни интересуват

//! navigateHandler prevents the default page reload by the <a> tag, if we have just '/addMovie' without calling the navigateHandler function, the correct content will load, but the page will reload too

function addEventListeners() {
    let navigationTemplate = document.getElementById('navigation-template').innerHTML;
    // let navigationTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML); => na Иво му е така и все пак работи
    let movieCardTemplate = document.getElementById('movie-card-template').innerHTML;

    Handlebars.registerPartial('navigation-template', navigationTemplate);
    Handlebars.registerPartial('movie-card-template', movieCardTemplate);

    // navigate('/'); // the first time that the app loads send the user to the home page
    navigate(location.pathname);
    // document.querySelector('.navigation').addEventListener('click', navigateHandler);
}

function navigateHandler(e) {
    e.preventDefault();

    // if (!e.target.classList.contains('nav-link')) {
    if (e.target.tagName !== 'A' && e.target.classList.contains('details-button') === false) {
        return;
    }

    if (e.target.tagName === 'BUTTON') {
        let url = new URL(e.target.parentElement.href); // if it is a button, it won't have an 'href' attribute
        console.log(url);
        navigate(url.pathname);
    } else {
        let url = new URL(e.target.href); // to turn it into an URL object from which one can easily get the pathname and other parts of the URL too
        console.log(url);
        navigate(url.pathname);
    }
    // navigate(url.pathname.slice(1)); // so that the path is without the '/' at the beginnning
}

const validateInputFieldsAreNotEmpty = (...values) => {
    for (const value of values) {
        if (value.trim() === '') {
            alert("Please fill in all the required fields!");
            return false;
        }
    }
    return true;
};

function onLoginSubmit(e) {
    e.preventDefault();

    let formData = new FormData(document.forms['login-form']);

    let email = formData.get('email');
    let password = formData.get('password');

    let isValid = validateInputFieldsAreNotEmpty(email, password);
    if (isValid === false) return;

    authService.login(email, password)
        .then(data => {
            navigate('/'); // navigate to the home page
        });
}

function onAddMovieSubmit(e) {
    e.preventDefault();

    let [title, description, imageUrl] = [...document.getElementById('add-movie-form').querySelectorAll('.form-control')].map(el => el.value);

    let isValid = validateInputFieldsAreNotEmpty(title, description, imageUrl);
    if (isValid === false) return;

    movieService.add({
            title,
            description,
            imageUrl,
            _creator: authService.getAuthData().email,
            _likesCount: 0,
            peopleLiked: [""]
        })
        .then(key => navigate('/'));
}

function onRegisterSubmit(e) {
    e.preventDefault();

    let formData = new FormData(document.forms['register-form']);

    let email = formData.get('email');
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword');

    let isValid = validateInputFieldsAreNotEmpty(email, password, repeatPassword);
    if (isValid === false) return;

    if (password !== repeatPassword) {
        alert("Passwords don't match!");
        return;
    }

    if (password.length < 6) {
        alert("The password should be at least 6 characters long!");
        return;
    }

    authService.register(email, password)
        .then(data => {
            navigate('/'); // navigate to the home page
        });
}

/* 
// works for this one <!-- <a class="btn btn-danger" data-key="{{key}}" onclick="deleteMovie(event)">Delete</a> -->
function deleteMovie(e) {
    let key = e.target.dataset.key;
    // let key = location.pathname.replace('/details/', '');

    movieService.deleteMovie(key)
        .then(res => navigate('/'));
} */
function deleteMovie(key) {
    movieService.deleteMovie(key)
        .then(res => navigate('/'));
}

function onEditMovieSubmit(e, key) {
    e.preventDefault();

    let [title, description, imageUrl] = [...document.getElementById('edit-movie-form').querySelectorAll('.form-control')].map(el => el.value);

    let isValid = validateInputFieldsAreNotEmpty(title, description, imageUrl);
    if (isValid === false) return;

    movieService.editMovie(key, {
            title,
            description,
            imageUrl,
        })
        .then(data => navigate(`/details/${key}`));
}

addEventListeners();