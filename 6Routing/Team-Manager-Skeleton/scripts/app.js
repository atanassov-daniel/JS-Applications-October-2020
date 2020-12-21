// import page from "./router.js";
// import { routes, page} from "./router.js";
import generatePages from "./pages.js";

(async function () {
    // const pageHtml = await generatePages.home();
    // const pageHtml = await generatePages.about();
    // const pageHtml = await generatePages.create();
    // const pageHtml = await generatePages.edit();
    // const pageHtml = await generatePages.login();
    // const pageHtml = await generatePages.register();
    // const pageHtml = await generatePages.catalog1();
    const pageHtml = await generatePages.catalog2();

    document.getElementById("main").innerHTML = pageHtml;
    // console.log(routes);
    // console.log(page);
})();

// export { auth, database, logIn, logOut, register, listenUserTeam, joinTeam, leaveTeam };
// import { database, auth, listenUserTeam } from './api.js';