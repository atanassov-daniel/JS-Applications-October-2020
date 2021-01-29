/* import {
    navigate
} from "./router.js";
import {
    authService
} from "./services.js"; */

function addEventListeners() {
    let navigationTemplateHTML = document.getElementById('navigation-template').innerHTML;

    Handlebars.registerPartial('navigation-template', navigationTemplateHTML);

    console.log(location.pathname);
    navigate(location.pathname);
}

window.navigateHandler = function navigateHandler(e) {
    console.log(e.target);
    e.preventDefault();

    let url = new URL(e.target.href || e.target.parentElement.href);
    console.log(url);
    navigate(url.pathname);
};

addEventListeners();

// Handlebars.registerPartial('navigation-template', document.getElementById('navigation-template').innerHTML);

/* let func = Handlebars.compile(document.getElementById('home-template').innerHTML);

console.log(authService.getAuthData());

document.getElementById('app').innerHTML = func({
    isAuthenticated: true,
    email: 'some@xxx.xx'
}); */

firebase.auth().onAuthStateChanged(function (user) {
    // console.log(authService.getAuthData());
    navigate(location.pathname);
});

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