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

    const getTeamsArray = async () => {
        const resp = await fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/teams/.json`);
        const teams = await resp.json();
        const final = [];
        Object.keys(teams).forEach(key => {
            const temp = {
                ...teams[key],
                _id: key
            };
            final.push(temp);
        });
        // console.log(final);
        return final;
    };
    // getTeamsArray();
    const checkIfHasTeam = async (username) => {
        const resp = await fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/usersTeams/${username}.json`);
        const teamKey = await resp.json();
        
        // if (teamKey === null) return { hasTeam: false };
        if (teamKey === null) return false;
        return true;
        // return { hasTeam: true, teamKey: teamKey };
    };

    const authObject = async () => {
        const output = {};
        output.loggedIn = firebase.auth().currentUser ? true : false;
        if (output.loggedIn) {
            output.username = firebase.auth().currentUser.email.replace("@abv.bg", "");

            // const hasTeam = await checkIfHasTeam(output.username);
            // if (hasTeam);
        }
        const hasTeam = await checkIfHasTeam();
        if (hasTeam == false) output.hasNoTeam = true;
        else output.hasTeam = hasTeam;
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

    const navigate = async (page) => { // , authObj
        const objAuth = await authObject();
        if (page === "catalog") objAuth.teams = await getTeamsArray();
        // console.log(objAuth);
        const pageHtml = await generatePages[page](objAuth); // generates the html for the page
        document.getElementById("main").innerHTML = pageHtml;
    };
    const changePage = async (e) => { // , authObj
        const pageToBeGenerated = router(routes, location.hash); // when the route is invalid, this will be null
        console.log(pageToBeGenerated);
        await navigate(pageToBeGenerated); // , authObject
    };

    await changePage();

    window.addEventListener("hashchange", changePage);
})();