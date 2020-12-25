// import page from "./router.js";
// import { routes, page} from "./router.js";

import {
    routes,
    router
} from "./router.js";
import generatePages from "./pages.js";

(async function () {
    // const pageHtml = await generatePages.home(authObject);
    // const pageHtml = await generatePages.about(authObject);
    // const pageHtml = await generatePages.create(authObject);
    // const pageHtml = await generatePages.edit(authObject);
    // const pageHtml = await generatePages.login(authObject);
    // const pageHtml = await generatePages.register(authObject);
    // const pageHtml = await generatePages.catalog1(authObject);
    // const pageHtml = await generatePages.catalog2(authObject);

    // document.getElementById("main").innerHTML = pageHtml;
    // console.log(routes);
    // console.log(page);

    const authObject = {
        loggedIn: true,
        username: "John Doe",
        hasTeam: true,
        teamId: "-Mqdu45emdfdvjifv"
    };

    const navigate = async (page, authObj) => {
        const pageHtml = await generatePages[page](authObj);
        document.getElementById("main").innerHTML = pageHtml;
    };
    const changePage = async (e) => { // , authObj
        const pageToBeGenerated = router(routes, location.hash);
        await navigate(pageToBeGenerated, authObject);
    };

    document.onload = changePage();

    window.addEventListener("hashchange", changePage); // when the route is invalid, this will be null
})();

// export { auth, database, logIn, logOut, register, listenUserTeam, joinTeam, leaveTeam };
// import { database, auth, listenUserTeam } from './api.js';