/* header -> loggedIn( + username if loggedIn === true)
about -> just header and footer
createPage(createForm is a partial in it, doesn't need anything) -> just header and footer
editForm(+header and footer for editPage) -> teamId, name, comment (the old values of the team that is to be edited) (form action="#/edit/:{{teamId}}" method="post")
home -> loggedIn(hasTeam(teamId))
loginPage(loginForm nothing) -> header and footer
registerPage(registerForm nothing) -> header and footer
teamCatalog -> hasNoTeam, ina4e {{#each teams}} {{> team}} -> _id, name, comment(optional) */
// !!!!!!!!!!!!!!!! halloAnna becomes halloanna for some reason
import {
    routes,
    router
} from "./router.js";
import generatePages from "./pages.js";
import {
    signIn,
    signUp
} from "./auth.js";

// (function () {})();

(async function () {
    // observer for logged in/out state
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            changePage();
        } else {
            changePage();
        }
    });

    /* window.register = function (е) {
        // e.preventDefault();
        // console.log(e);
        const [username, pass1, pass2] = [...document.querySelectorAll('form[action="#/register"] input')].map(el => el.value);
        console.log(username);
        console.log(pass1);
        console.log(pass2);

        if (pass1 !== pass2) {
            alert("Passwords don't match");
            return 1;
        }
        // validate username -> not just letters and maybe some other pattern too, shouldn't contain @ too
        signUp(username.concat("@abv.bg"), pass1);
    }; */

    window.register = (e) => {
        e.preventDefault();
        const [username, pass1, pass2] = [...document.querySelectorAll('form[action="#/register"] input')].map(el => el.value);

        if (pass1 !== pass2) {
            alert("Passwords don't match");
            return 1;
        }

        signUp(username.concat("@abv.bg"), pass1);
        /* firebase.auth().createUserWithEmailAndPassword(username.concat("@abv.bg"), pass1)
            .then((user) => {
                alert("Successfully registered");
                location.hash = "#/home/";
            })
            .catch((error) => {
                alert(`Couldn't be registered - ${error.message}`);
            }); */
    };
    window.login = (e) => {
        e.preventDefault();
        const [username, password] = [...document.querySelectorAll('form[action="#/login"] input')].map(el => el.value);

        signIn(username.concat("@abv.bg"), password);
    };

    // const authObj = { loggedIn: true, username: "John Doe", hasTeam: true, teamId: "-Mqdu45emdfdvjifv" };
    const authObject = () => {
        const output = {};
        output.loggedIn = firebase.auth().currentUser ? true : false;
        // if (localStorage.getItem("loggedIn") === "true") output.loggedIn = true;
        // if (loggedIn == true) output.loggedIn = true;
        if (output.loggedIn) output.username = firebase.auth().currentUser.email.replace("@abv.bg", "");
        // output.hasTeam = true;
        // output.teamId = "-Mqdu45emdfdvjifv";
        console.log(firebase.auth().currentUser);
        return output;
    };

    const navigate = async (page, authObj) => {
        const objAuth = authObject();
        console.log(objAuth);
        const pageHtml = await generatePages[page](objAuth); // generates the html for the page
        document.getElementById("main").innerHTML = pageHtml;
    };
    const changePage = async (e) => { // , authObj
        const pageToBeGenerated = router(routes, location.hash); // when the route is invalid, this will be null
        await navigate(pageToBeGenerated); // , authObject
    };

    await changePage(); // document.onload = 

    window.addEventListener("hashchange", changePage);
})();