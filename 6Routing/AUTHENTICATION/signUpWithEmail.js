function signUpWithEmailPassword(email, password) {
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

export default signUpWithEmailPassword;