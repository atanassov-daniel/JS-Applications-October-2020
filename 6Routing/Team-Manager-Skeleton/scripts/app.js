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

(async function () {
    firebase.auth().onAuthStateChanged(function (user) {
        changePage(); // with that the function generating an authObject will be reinvoked
    });

    window.register = (e) => {
        e.preventDefault();
        const [username, pass1, pass2] = [...document.querySelectorAll('form[action="#/register"] input')].map(el => el.value);

        if (pass1 !== pass2) {
            alert("Passwords don't match");
            return 1;
        }

        signUp(username.concat("@abv.bg"), pass1);
    };

    window.login = (e) => {
        e.preventDefault();
        const [username, password] = [...document.querySelectorAll('form[action="#/login"] input')].map(el => el.value);

        signIn(username.concat("@abv.bg"), password);
    };

    window.createTeam = (e) => {
        e.preventDefault();

        const [teamName, teamComment] = [...document.querySelector('form[action="#/create"]').querySelectorAll('input.form-control')].map(el => el.value);

        if (teamName.trim() === "" || teamComment.trim() === "") {
            alert("Please fill in all the required fields!");
            return;
        }

        const username = firebase.auth().currentUser.email.replace("@abv.bg", "");

        fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/teams/.json`, {
                method: "POST",
                body: JSON.stringify({
                    _creator: username,
                    name: teamName,
                    comment: teamComment
                })
            })
            .then(resp => resp.json())
            .then(obj => {
                fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/usersTeams/${username}.json`, {
                        method: "PUT",
                        body: JSON.stringify(obj.name)
                    })
                    .then(resp => resp.json());
                // .then(data => console.log(data));

                location.hash = `#/catalog/`;
            })
            .catch(error => console.log(error));
    };

    // this function returns an array of all available teams
    const getTeamsArray = async () => {
        const resp = await fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/teams/.json`);
        const teams = await resp.json();
        const final = [];
        Object.keys(teams).forEach(key => {
            final.push({
                ...teams[key],
                _id: key
            });
        });
        // console.log(final);
        return final;
    };

    const checkIfHasTeam = async (username) => {
        const resp = await fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/usersTeams/${username}.json`);
        const teamKey = await resp.json();

        // if (teamKey === null) return { hasTeam: false };
        console.log(teamKey);
        if (teamKey === null) return false;
        return true;
        // return { hasTeam: true, teamKey: teamKey };
    };

    const authObject = async () => {
        const output = {};
        const currentUser = firebase.auth().currentUser;
        output.loggedIn = currentUser ? true : false;
        if (output.loggedIn) {
            output.username = firebase.auth().currentUser.email.replace("@abv.bg", "");
            // const hasTeam = await checkIfHasTeam(output.username);
            // if (hasTeam);
        }

        const hasTeam = await checkIfHasTeam(currentUser ? currentUser.email.replace("@abv.bg", "") : null);
        if (hasTeam == false) output.hasNoTeam = true;
        else output.hasNoTeam = false;
        output.hasTeam = hasTeam;
        console.log(hasTeam);
        /* const objHasTeam = await checkIfHasTeam();
        if (objHasTeam.hasTeam === false) output.hasNoTeam = true;
        else {
            output.hasTeam = true;
            output.teams;
        } */
        // output.hasTeam = true;
        // output.teamId = "-Mqdu45emdfdvjifv";

        // output = {...output, ...teamObj};

        // console.log(firebase.auth().currentUser);
        return output;
    };

    const authPages = ["create", "edit", "catalog", "details"];

    const navigate = async (page) => { // , authObj
        const objAuth = await authObject();

        /* objAuth.isAuthPage = false;
        for (const authPage of authPages) {
            if (page.includes(authPage)) objAuth.isAuthPage = true; // if the page is one of the authorized ones
        }
        if (objAuth.isAuthPage && objAuth.loggedIn == false) page = "unauthorized"; */

        // if the page requested is one for authorized users only and the user isn't authorized, load the Unauthorized User warning page
        if (authPages.includes(page) && objAuth.loggedIn == false) page = "unauthorized";

        if (page === "catalog") objAuth.teams = await getTeamsArray();
        // console.log(objAuth);
        const pageHtml = await generatePages[page](objAuth); // generates the html for the page
        document.getElementById("main").innerHTML = pageHtml;
    };
    const changePage = async (e) => { // , authObj
        const pageToBeGenerated = router(routes, location.hash); // when the route is invalid, this will be null
        // console.log(pageToBeGenerated);
        await navigate(pageToBeGenerated); // , authObject
    };

    await changePage();

    window.addEventListener("hashchange", changePage);
})();