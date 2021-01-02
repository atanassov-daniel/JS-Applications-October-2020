/* header -> loggedIn( + username if loggedIn === true)
about -> just header and footer
createPage(createForm is a partial in it, doesn't need anything) -> just header and footer
editForm(+header and footer for editPage) -> teamId, name, comment (the old values of the team that is to be edited) (form action="#/edit/:{{teamId}}" method="post")
home -> loggedIn(hasTeam(teamId))
loginPage(loginForm nothing) -> header and footer
registerPage(registerForm nothing) -> header and footer
teamCatalog -> hasNoTeam, ina4e {{#each teams}} {{> team}} -> _id, name, comment(optional) */

import {
    routes,
    router
} from "./router.js";
import generatePages from "./pages.js";
import {
    signIn,
    signOut,
    signUp
} from "./auth.js";

(function () {
    window.register = (е) => {
        console.log(e);
        e.preventDefault();

        const labels = document.querySelectorAll('form[action="#/register"] label');
        if (labels[1] !== labels[2]) {
            alert("Passwords don't match");
            return 1;
        }
        // validate username -> not just letters and maybe some other pattern too, shouldn't contain @ too
        signUp(labels[0].concat("@abv.bg"), labels[1]);
    };
})();

(async function () {
    // const authObj = { loggedIn: true, username: "John Doe", hasTeam: true, teamId: "-Mqdu45emdfdvjifv" };
    const authObject = () => {
        const output = {};
        output.loggedIn = firebase.auth().currentUser ? true : false;
        if (output.loggedIn) output.username = firebase.auth().currentUser.email.replace("@abv.bg", "");
        // output.hasTeam = true;
        // output.teamId = "-Mqdu45emdfdvjifv";

        return output;
    };

    const navigate = async (page, authObj) => {
        const pageHtml = await generatePages[page](authObject()); // generates the html for the page
        document.getElementById("main").innerHTML = pageHtml;
    };
    const changePage = async (e) => { // , authObj
        const pageToBeGenerated = router(routes, location.hash); // when the route is invalid, this will be null
        await navigate(pageToBeGenerated, authObject);
    };

    await changePage(); // document.onload = 

    window.addEventListener("hashchange", changePage);
})();