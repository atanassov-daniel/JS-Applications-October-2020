const successBoxEl = document.querySelector("#successBox");
const successBoxParentEl = document.querySelector("#successBox").parentElement;
const errorBoxEl = document.querySelector("#errorBox");
const errorBoxParentEl = document.querySelector("#errorBox").parentElement;

const auth = firebase.auth(); // seen from Angel
const redirectToHome = () => location.hash = "#/home/"; // redirect the user to the home page

function signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            successBoxEl.textContent = "Successfully signed in";
            successBoxParentEl.style.display = "block";
            redirectToHome();
        })
        .catch((error) => {
            errorBoxEl.textContent = `Couldn't sign in - ${error.message}`;
            errorBoxParentEl.style.display = "block";
        });
}

function logOut() {
    auth.signOut().then(function () {
        successBoxEl.textContent = "Successfully logged out";
        successBoxParentEl.style.display = "block";
        redirectToHome();
    }).catch(function (error) {
        errorBoxEl.textContent = `Couldn't be logged out - ${error.message}`;
        errorBoxParentEl.style.display = "block";
    });
}

function signUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            successBoxEl.textContent = "Successfully registered";
            successBoxParentEl.style.display = "block";
            redirectToHome();
        })
        .catch((error) => {
            errorBoxEl.textContent = `Couldn't be registered - ${error.message}`;
            errorBoxParentEl.style.display = "block";
        });
}

window.register = (e) => {
    e.preventDefault();

    const [email, password, repeatPassword] = [...document.querySelectorAll("input")].map(el => el.value);

    if (email.trim() === "" || password.trim() === "" || repeatPassword.trim() === "") {
        errorBoxEl.textContent = "Please fill in all the required fields";
        errorBoxParentEl.style.display = "block";
        return;
    }

    if (password !== repeatPassword) {
        errorBoxEl.textContent = "Passwords don't match";
        errorBoxParentEl.style.display = "block";
        return;
    }

    if (password.length < 6) {
        errorBoxEl.textContent = "Password should be at least 6 characters long!";
        errorBoxParentEl.style.display = "block";
        return;
    }

    errorBoxParentEl.style.display = "none";
    signUp(email, password);
};

window.login = (e) => {
    console.log(e);
    e.preventDefault();

    const [email, pass] = [...document.querySelectorAll("input")].map(el => el.value);
    console.log([email, pass]);

    if (email.trim() === "" || pass.trim() === "") {
        errorBoxEl.textContent = "Please fill in all the required fields";
        errorBoxParentEl.style.display = "block";
        return;
    }

    if (pass.length < 6) {
        errorBoxEl.textContent = "Password should be at least 6 characters long!";
        errorBoxParentEl.style.display = "block";
        return;
    }

    errorBoxParentEl.style.display = "none";
    signIn(email, pass);
    /* Promise.then(user => {
        successBoxEl.textContent = "Successfully registered!";
    }); */
};