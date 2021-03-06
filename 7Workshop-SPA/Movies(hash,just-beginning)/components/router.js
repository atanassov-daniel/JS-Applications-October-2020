const routes = {
    home: ["#/home", "#/home/", "#", "#/", ""],
    addMovie: ["#/addMovie", "#/addMovie/"],
    // edit: ["#/edit", "#/edit/"],
    // details: ["#/details", "#/details/"],
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
        if (hash.includes("details")) return "details";
        if (hash.includes("edit")) return "edit";
    }

    return null;
};

export {
    routes,
    router
};