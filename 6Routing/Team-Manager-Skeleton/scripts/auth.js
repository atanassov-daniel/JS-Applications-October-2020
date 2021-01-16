const auth = firebase.auth(); // seen from Angel
const redirect = () => location.hash = "#/home/"; // redirect the user to the home page;

export function signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            // alert("Sign-in successful.");
            location.hash = "#/home/";
        })
        .catch((error) => {
            alert(`Couldn't sign in - ${error.message}`);
        });
}

export function logOut() {
    auth.signOut().then(function () {
        // alert("Sign-out successful.");
        location.hash = "#/home/"; // redirect the user to the home page
    }).catch(function (error) {
        alert(`Couldn't be signed-out - ${error.message}`);
    });
}

export function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            // alert("Successfully registered");
            location.hash = "#/home/"; // redirect the user to the home page

            fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/usersTeams/.json`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        [email.replace("@abv.bg", "")]: ""
                    })
                })
                .then(resp => resp.json());
            // .then(r => console.log(r));
        })
        .catch((error) => {
            alert(`Couldn't be registered - ${error.message}`);
        });
}