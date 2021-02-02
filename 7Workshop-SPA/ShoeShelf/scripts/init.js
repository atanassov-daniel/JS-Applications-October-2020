//! navigateHandler prevents the default reload by the 'a' tag

import {
    navigate
} from "./router.js";
import {
    authService
} from "./authService.js";
import {
    shoeService
} from "./shoeService.js";

function addEventListeners() {
    let navigationTemplateHTML = document.getElementById('navigation-template').innerHTML;
    // let notificationsTemplateHTML = document.getElementById('notifications-template').innerHTML;
    let shoeCardTemplateHTML = document.getElementById('shoe-card-template').innerHTML;

    Handlebars.registerPartial('navigation-template', navigationTemplateHTML);
    // Handlebars.registerPartial('notifications-template', notificationsTemplateHTML);
    Handlebars.registerPartial('shoe-card-template', shoeCardTemplateHTML);

    console.log(`on initial load location.pathname = ${location.pathname}`);
    navigate(location.pathname);
}

window.navigateHandler = function navigateHandler(e) {
    // console.log(e.target);
    // console.log(e.currentTarget.href);
    e.preventDefault();

    console.log(e.currentTarget.tagName === 'DIV' && e.currentTarget.classList.contains('shoe'));

    let pathname = (e.currentTarget.tagName === 'DIV' && e.currentTarget.classList.contains('shoe')) ? `/details/${e.currentTarget.id}` : new URL(e.currentTarget.href).pathname;
    // let pathname = new URL(e.currentTarget.href).pathname;

    // let url = new URL(e.target.href || e.target.parentElement.href);
    console.log(pathname);
    navigate(pathname);
};

addEventListeners();

firebase.auth().onAuthStateChanged(function (user) {
    // console.log(authService.getAuthData());
    navigate(location.pathname);
});

const validateInputFields = (...inputValues) => {
    for (const value of inputValues) {
        if (value.trim() === '') {
            alert('Please fill in all the fields!');
            return false;
        }
    }
    return true;
};

/* window.showNotification = (message, type) => {
    let sectionElement;

    if (type === 'error') {
        sectionElement = document.getElementById('errorBoxSection');
    } else { // 'success'
        sectionElement = document.getElementById('successBoxSection');
    }

    sectionElement.firstElementChild.innerText = message;
    sectionElement.style.display = 'block';
    sectionElement.scrollIntoView();

    setTimeout(() => {
        sectionElement.style.display = 'none';
    }, 3000);
}; */

window.onCreateOfferSubmit = function (e) {
    e.preventDefault();

    let [name, price, imageUrl, brand] = [...document.querySelectorAll('input')].map(el => el.value);
    let description = document.querySelector('textarea').value;

    let isValid = validateInputFields(name, price, imageUrl, description, brand);
    if (isValid === false) return;

    price = price.replace(',', '.');
    if (isNaN(Number(price))) { // if the price is invalid, 
        alert('The price must be a number!');
        return;
    }

    shoeService.create({
            name,
            price: Number(price),
            imageUrl,
            description,
            brand,
            _creator: authService.getAuthData().email
            // _buyers
        })
        .then(key => {
            // showNotification('Created successfully!');
            navigate('/');
        });
    // console.log(price);
    // Number(document.querySelectorAll('input')[1].value.replace(',', '.')).toFixed(2);
};

window.onRegisterSubmit = (e) => {
    e.preventDefault();

    const [email, password, repeatPassword] = [...document.querySelectorAll('input')].map(el => el.value);

    let isValid = validateInputFields(email, password, repeatPassword);
    if (isValid === false) return;

    if (email.match(/\S+@\S+\.\S+/) === null) {
        alert('The email address is invalid!');
        return;
    }

    if (password !== repeatPassword) {
        alert('Passwords don\'t match!');
        return;
    }

    if (password.length < 6) {
        alert('The password should be at least 6 characters long!');
        return;
    }
    /* authService.signUp(email, password)
        .then(userEmail => console.log(userEmail))
        .catch(err => console.log(err)); */
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            navigate('/');
        })
        .catch((error) => {
            alert(`Couldn't be registered - ${error.message}`);
        });
};

window.onLoginSubmit = (e) => {
    e.preventDefault();

    const [email, password] = [...document.querySelectorAll('input')].map(el => el.value);

    let isValid = validateInputFields(email, password);
    if (isValid === false) return;

    if (email.match(/\S+@\S+\.\S+/) === null) {
        alert('The email address is invalid!');
        return;
    }

    if (password.length < 6) {
        alert('The password should be at least 6 characters long!');
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            navigate('/');
        })
        .catch((error) => {
            alert(`Couldn't log in - ${error.message}`);
        });
};


/* window.showDetails = function (e) {
    // console.log(e.target);
    console.log(e.currentTarget);
}; */

/* firebase.auth().createUserWithEmailAndPassword('test@test.bg', '123456')
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
    }); */