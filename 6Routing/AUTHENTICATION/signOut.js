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

export default signOut;