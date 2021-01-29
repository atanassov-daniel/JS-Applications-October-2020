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
    let shoeCardTemplateHTML = document.getElementById('shoe-card-template').innerHTML;

    Handlebars.registerPartial('navigation-template', navigationTemplateHTML);
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

window.onCreateOfferSubmit = function (e) {
    e.preventDefault();

    let [name, price, imageUrl, brand] = [...document.querySelectorAll('input')].map(el => el.value);
    let description = document.querySelector('textarea').value;

    let isValid = validateInputFields(name, price, imageUrl, description, brand);
    if (isValid === false) return;

    price = price.replace(',', '.');
    if (isNaN(Number(price))) { // if the price is invalid, 
        alert('The price must be a number');
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
        .then(key => navigate('/'));
    // console.log(price);
    // Number(document.querySelectorAll('input')[1].value.replace(',', '.')).toFixed(2);
};

window.showDetails = function (e) {
    // console.log(e.target);
    console.log(e.currentTarget);
};

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