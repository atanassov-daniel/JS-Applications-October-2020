/* import signUpWithEmailPassword from "./signUpWithEmail.js";
import signOut from "./signOut.js";
import signInWithEmailPassword from "./signInWithEmail.js"; */

import {
    signInWithEmailPassword,
    signOut,
    signUpWithEmailPassword
} from "./authFunctions.js";

// logged in => logout form
// not logged => login form(and register onclick of the register button)
// if the user is already registered, he should not be able to register again, instead alert(An account with this email adress already exists, please sign in or provide a different email adress)

// the passwords for all users are `123456`
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const logoutForm = document.getElementById("logoutForm");

const signedIn = (user) => {
    loginForm.style.display = "none";
    registerForm.style.display = "none";
    logoutForm.style.display = "block";

    console.log(user);
    document.getElementById("welcome").textContent = `Welcome ${user.email}`;
};
const signedOut = () => {
    loginForm.style.display = "block";
    registerForm.style.display = "block";
    logoutForm.style.display = "none";
};

const validate = (email, password1, password2) => {
    if (!password2) password2 = password1;

    if (email === "" || password1 === "" || password2 === "") {
        alert("Please fill in all the fields");
        return false;
    }
    if (password1 !== password2) {
        alert("Passwords don't match, please try again");
        return false;
    }
};


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        signedIn(firebase.auth().currentUser);
    } else {
        // No user is signed in.
        signedOut();
    }
});

document.getElementById("signup").addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector("form#registerForm input[type=email]").value.trim();
    const passwords = [...document.querySelectorAll("form#registerForm input[type=password]")].map(pass => pass.value.trim());
    const isValid = validate(email, passwords[0], passwords[1]);
    if (isValid === false) return;

    let ret = signUpWithEmailPassword(email, passwords[0]);
    console.log(ret);
    document.querySelector("form#registerForm input[type=email]").value = "";
    document.querySelectorAll("form#registerForm input[type=password]").forEach(pass => pass.value = "");
});

document.getElementById("signout").addEventListener("click", (e) => {
    if (firebase.auth().currentUser) {
        signOut();
    }
});

document.getElementById("signin").addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector("form#loginForm input[type=email]").value.trim();
    const password = document.querySelector("form#loginForm input[type=password]").value.trim();
    const isValid = validate(email, password);
    if (isValid === false) return;

    signInWithEmailPassword(email, password);
    document.querySelector("form#loginForm input[type=email]").value = "";
    document.querySelector("form#loginForm input[type=password]").value = "";
});