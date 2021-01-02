const auth = firebase.auth(); // seen from Angel

export function signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            alert("Sign-in successful.");
        })
        .catch((error) => {
            alert(`Couldn't sign in - ${error.message}`);
        });
}

export function signOut() {
    auth.signOut().then(function () {
        alert("Sign-out successful.");
    }).catch(function (error) {
        alert(`Couldn't be signed-out - ${error.message}`);
    });
}

export function signUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            alert("Successfully registered");
        })
        .catch((error) => {
            alert(`Couldn't be registered - ${error.message}`);
        });
}