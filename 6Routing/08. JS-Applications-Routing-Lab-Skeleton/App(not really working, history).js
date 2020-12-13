// Create  Furniture (POST): /furniture/create

// Validate fields:
// Make and Model must be at least 4 symbols long
// Year must be between 1950 and 2050
// Description must be more than 10 symbols
// Price must be a positive number
// Image URL is required
// Material is optional

// If the creation is successful show a message and redirect to all furniture.

// console.log(location.pathname);
// location.pathname = location.pathname + "/furniture";

// location.pathname =

async function loadFurniture() {
    const createFurnitureHtml = await (await fetch("./create-furniture.html")).text();

    document.querySelector("div#container").innerHTML += createFurnitureHtml;
}

const router = {
    "/furniture/create": loadFurniture,
    "/furniture": async function () {
        // const indexHtml = await (await fetch("./index.html")).text();
        // document.outerHTML = indexHtml;
    }
};

window.addEventListener("popstate", async (e) => {
    console.log(location.pathname);
    // history.pushState()
    // router[location.pathname]();
});