// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCjtRlEKKW7Zzcwv7Wl5rGsw60NVQbr80I",
    authDomain: "my-movies-e283b.firebaseapp.com",
    databaseURL: "https://my-movies-e283b.firebaseio.com",
    projectId: "my-movies-e283b",
    storageBucket: "my-movies-e283b.appspot.com",
    messagingSenderId: "88153257887",
    appId: "1:88153257887:web:c94acedf6ee74117972faa"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

let buttonElement = document.getElementById("login-button");

buttonElement.addEventListener("click", onUserLogin);

function onUserLogin(e) {
    let usernameElement = document.getElementById("username");
    let passwordElement = document.getElementById("password");
    let subHeaderElement = document.getElementById("sub-header");
    let loginFormElement = document.getElementById("login-form");

    auth.signInWithEmailAndPassword(usernameElement.value, passwordElement.value)
        .then((res) => {
            subHeaderElement.innerText = `Hello, ${res.user.email}`;

            loginFormElement.style.display = "none";

            console.log("Successfully logged in");
            console.log(res.user.metadata.lastSignInTime);
            console.log(res.additionalUserInfo);
            // Signed in 
            // ...
        })
        .catch((error) => {
            console.log(`err: ${error}`);
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}