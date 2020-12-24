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

export default signInWithEmailPassword;