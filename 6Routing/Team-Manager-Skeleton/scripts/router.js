const routes = {
    home: ["#/home", "#/home/", "#", "#/", ""],
    about: ["#/about", "#/about/"],
    catalog: ["#/catalog", "#/catalog/"],
    logout: ["#/logout", "#/logout/"],
    login: ["#/login", "#/login/"],
    register: ["#/register", "#/register/"]
};

const router = (routes, hash) => {
    const routesNamesArray = Object.keys(routes);

    for (let index = 0; index < routesNamesArray.length; index++) {
        const currentRouteName = routesNamesArray[index];
        const currentRoutePossibilities = routes[currentRouteName]; // an array with all possible URLs
        if (currentRoutePossibilities.includes(hash)) return currentRouteName;
    }

    return null;
    // if (routes.home.includes(hash)) { // home} else if (routes.about.includes(hash)) {}
};

// const hash = location.hash;
// const page = router(routes, hash);

window.addEventListener("hashchange", (e) => console.log(router(routes, location.hash))); // when the route is invalid, this will be undefined

// export { routes, page};
const navigate = () => {
    // document.querySelector("div#main").innerHTML;
};

// export default page;



/* const homeRoutes = ["#/home", "", "#/home/", "#/", "#"];
const aboutRoutes = ["#/about", "#/about/"];
const catalogRoutes = ["#/catalog", "#/catalog/"];
// const logoutRoutes = ["#/logout", "#/logout/"];
const loginRoutes = ["#/login", "#/login/"];
const registerRoutes = ["#/register", "#/register/"]; */