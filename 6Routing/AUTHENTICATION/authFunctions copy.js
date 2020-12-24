function signInWithEmailPassword(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in 
            console.log("Sign-in successful.");
            alert("Sign-in successful.");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error code: " + errorCode);
            console.log("error message: " + errorMessage);
            alert("Couldn't sign in");
        });
}

function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("Sign-out successful.");
        alert("Sign-out successful.");
    }).catch(function (error) {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert("Couldn't be registered");
    });
}

function signUpWithEmailPassword(email, password) {
    // some = undefined;
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in 
            alert("Successfully registered");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            alert("Couldn't be registered");
        });
    // [END auth_signup_password]
}

export {
    signInWithEmailPassword,
    signOut,
    signUpWithEmailPassword
};