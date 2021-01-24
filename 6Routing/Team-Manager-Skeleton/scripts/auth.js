const auth = firebase.auth(); // seen from Angel
const redirectToHome = () => location.hash = "#/home/"; // redirect the user to the home page

export function signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            redirectToHome();
        })
        .catch((error) => {
            alert(`Couldn't sign in - ${error.message}`);
        });
}

export function logOut() {
    auth.signOut().then(function () {
        redirectToHome();
    }).catch(function (error) {
        alert(`Couldn't be signed-out - ${error.message}`);
    });
}

export function signUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {

            redirectToHome();

            fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/usersTeams/.json`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        [email.replace("@abv.bg", "")]: ""
                    })
                })
                .then(resp => resp.json());
        })
        .catch((error) => {
            alert(`Couldn't be registered - ${error.message}`);
        });
}