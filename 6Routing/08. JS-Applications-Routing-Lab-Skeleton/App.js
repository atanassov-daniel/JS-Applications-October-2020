import helpers from "./helpers.js";
Object.keys(helpers).forEach(key => window[key] = helpers[key]); // put the helper functions in the global scope

(async function () {
    const defaultPageHtml = `<div id="change-html"></div>

<a href="furniture.html#/create" style="display: block;">create</a>
<a href="furniture.html#/all" style="display: block;">all</a>
<a href="furniture.html#/details/1" style="display: block;">details/1</a>
<a href="furniture.html#/mine" style="display: block;">mine</a>
<a href="furniture.html#/delete/1" style="display: block;">delete/1</a>
`;

    const createFurnitureHTML = await (await fetch("./create-furniture.html")).text();
    // const allFurnitureHTML = await (await fetch("./allFurniture.html")).text();
    const furnitureDetailsHTML = await (await fetch("./furnitureDetails.html")).text();
    const myFurnitureHTML = await (await fetch("./myFurniture.html")).text();

    const htmlTemplateAllFurniture = await (await fetch("./allFurniture.hbs")).text();
    const templateAllFurniture = Handlebars.compile(htmlTemplateAllFurniture);

    const router = {
        "": defaultPageHtml,
        "#": defaultPageHtml,
        "#/": defaultPageHtml,
        "#/create": createFurnitureHTML,
        "#/create/": createFurnitureHTML,
        // "#/all": allFurnitureHTML,
        "#/all": templateAllFurniture(await (await fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/furniture/.json`)).json()),
        // "#/all/": allFurnitureHTML,
        "#/all/": templateAllFurniture(await (await fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/furniture/.json`)).json()),
        "#/details/1": furnitureDetailsHTML,
        "#/details/1/": furnitureDetailsHTML,
        "#/mine": myFurnitureHTML,
        "#/mine/": myFurnitureHTML,
        "#/delete/1": "<h3>Delete{1} Page...</h3>",
        "#/delete/1/": "<h3>Delete{1} Page...</h3>",
    };
// [...document.querySelectorAll(".col-md-4")].forEach(el=>el.style.padding="12px")
    const navigate = () => {
        if (location.hash !== "" && location.hash !== "#" && location.hash !== "#/") {
            document.getElementById("container").innerHTML = router[location.hash] || "<h2>404 Not Found</h2>";
            // document.getElementById("change-html").innerHTML = router[location.hash] || "<h2>404 Not Found</h2>";
            // [...document.querySelectorAll("a")].forEach(a => a.style.display = "none");
        } else { // if (location.href.split("/").pop() === "furniture.html")
            document.getElementById("container").innerHTML = defaultPageHtml;
        }
    };
    navigate();

    window.addEventListener("hashchange", navigate);
})();