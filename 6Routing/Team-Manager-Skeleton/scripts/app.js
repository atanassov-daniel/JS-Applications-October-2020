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

        if (teamName.trim() === "") {
            alert("Please fill in the name field, the comment is optional!");
            return;
        }

        const username = firebase.auth().currentUser.email.replace("@abv.bg", "");

        fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/teams/.json`, {
                method: "POST",
                body: JSON.stringify({
                    _creator: username,
                    name: teamName,
                    comment: teamComment ? teamComment : ""
                })
            })
            .then(resp => resp.json())
            .then(obj => {
                fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/usersTeams/${username}.json`, {
                        method: "PUT",
                        body: JSON.stringify(obj.name)
                    })
                    .then(resp => resp.json())
                    .then(key => location.hash = `#/catalog/`);
            })
            .catch(error => console.log(error));
    };
    window.leave = () => {
        // const key = location.hash.replace("#/details/:", "");
        fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/usersTeams/${firebase.auth().currentUser.email.replace("@abv.bg", "")}.json`, {
                method: "PUT",
                body: JSON.stringify("")
            })
            .then(resp => resp.json())
            .then(key => location.hash = `#/catalog/`);
    };
    window.join = () => {
        const key = location.hash.replace("#/details/:", "");
        const username = firebase.auth().currentUser.email.replace("@abv.bg", "");

        fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/usersTeams/${username}.json`, {
                method: "PUT",
                body: JSON.stringify(key)
            })
            .then(resp => resp.json())
            .then(key => location.hash = `#/catalog/`); // this will redirect to the details page, if it was "location.hash = `#/details/:${key}`" instead, the hash wouldn't change and so the page wouldn't reload to reflect the Join Team change
    };
    window.updateTeam = (e) => {
        e.preventDefault();

        const key = location.hash.replace("#/edit/:", "");
        fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/teams/${key}.json`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: document.querySelector("input#name").value,
                    comment: document.querySelector("input#comment").value
                })
            })
            .then(resp => resp.json())
            .then(data => location.hash = `#/details/:${key}`);
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
        return final;
    };

    const checkIfHasTeam = async (username) => {
        const resp = await fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/usersTeams/${username}.json`);
        const teamKey = await resp.json();

        if (teamKey === null || teamKey.trim() === "") return false; // return false
        return teamKey; // else return the key of the team
    };

    const getTeamInfo = async (teamKey) => {
        const resp = await fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/teams/${teamKey}/.json`);
        const data = await resp.json();
        return data;
    };
    const getTeamMembers = async (teamKey) => {
        const resp = await fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/usersTeams/.json`);
        const data = await resp.json(); // usernames and their corresponding teams

        const members = [];
        Object.keys(data).forEach(username => {
            // if the user is a member of the team
            if (data[username] == teamKey) members.push({
                username: username
            });
        });
        return members;
    };

    const authObject = async () => {
        const output = {};
        const currentUser = firebase.auth().currentUser;
        output.loggedIn = currentUser ? true : false;
        if (output.loggedIn) output.username = firebase.auth().currentUser.email.replace("@abv.bg", "");

        const hasTeam = await checkIfHasTeam(currentUser ? currentUser.email.replace("@abv.bg", "") : null);

        if (hasTeam == false) output.hasNoTeam = true;
        else output.hasNoTeam = false;

        if (hasTeam !== false) {
            output.hasTeam = true;
            output.teamId = hasTeam;
        } else {
            output.hasTeam = false;
        }

        return output;
    };

    const authPages = ["create", "edit", "catalog", "details"];

    const navigate = async (page) => {
        const objAuth = await authObject();

        // if the page requested is one for authorized users only and the user isn't authorized, load the Unauthorized User warning page
        if (authPages.includes(page) && objAuth.loggedIn == false) page = "unauthorized";

        // if the user is a member of a team, redirect him to that team
        if (objAuth.hasTeam == true && location.hash.startsWith("#/catalog")) location.hash = `#/details/:${objAuth.teamId}`; // location.hash !== `#/details/:${objAuth.teamId}`

        if (page === "details") {
            const teamInfoObj = await getTeamInfo(location.hash.replace("#/details/:", ""));
            objAuth.comment = teamInfoObj.comment;
            objAuth.name = teamInfoObj.name;

            const detailsTeamKey = location.hash.replace("#/details/:", "");
            // if the current user is the creator of the team
            if (teamInfoObj._creator === objAuth.username && objAuth.teamId === detailsTeamKey) objAuth.isAuthor = true;
            else objAuth.isAuthor = false;
            // if the user is a member of the team whose details he is looking at, react accordingly
            if (objAuth.teamId === detailsTeamKey) objAuth.isOnTeam = true;
            else objAuth.isOnTeam = false;

            objAuth.members = await getTeamMembers(objAuth.teamId);
        }
        if (page === "edit") {
            const key = location.hash.replace("#/edit/:", "");
            const teamDetails = await getTeamInfo(key);
            const id = setInterval(() => {
                if (document.querySelector("input#name")) {
                    document.querySelector("input#name").value = teamDetails.name;
                    document.querySelector("input#comment").value = teamDetails.comment;
                    clearInterval(id);
                }
            }, 250);
        }

        if (page === "catalog") objAuth.teams = await getTeamsArray();

        const pageHtml = await generatePages[page](objAuth); // generates the html for the page
        document.getElementById("main").innerHTML = pageHtml;
    };
    const changePage = async (e) => {
        const pageToBeGenerated = router(routes, location.hash); // when the route is invalid, this will be null
        await navigate(pageToBeGenerated);
    };

    await changePage(); // on page load

    window.addEventListener("hashchange", changePage);
})();