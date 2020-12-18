import helpers from "./helpers.js";
Object.keys(helpers).forEach(key => window[key] = helpers[key]); // put the helper functions in the global scope

(async function () {
    const defaultPageHtml = `<div id="change-html"></div>

<a href="furniture.html#/create" style="display: block;">create</a>
<a href="furniture.html#/all" style="display: block;">all</a>
<a href="furniture.html#/details/-MOmWv5MFpwpd5FjkCr7" style="display: block;">details/-MOmWv5MFpwpd5FjkCr7</a>
<a href="furniture.html#/mine" style="display: block;">mine</a>
<a href="furniture.html#/delete/1" style="display: block;">delete/1</a>
`;

    const createFurnitureHTML = await (await fetch("./create-furniture.html")).text();
    // const allFurnitureHTML = await (await fetch("./allFurniture.html")).text();
    // const furnitureDetailsHTML = await (await fetch("./furnitureDetails.html")).text();
    const myFurnitureHTML = await (await fetch("./myFurniture.html")).text();

    const htmlTemplateAllFurniture = await (await fetch("./allFurniture.hbs")).text();
    const templateAllFurniture = Handlebars.compile(htmlTemplateAllFurniture);

    const htmlTemplateFurnitureDetails = await (await fetch("./furnitureDetails.hbs")).text();
    const templateFurnitureDetails = Handlebars.compile(htmlTemplateFurnitureDetails);

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
        // "#/details/1": furnitureDetailsHTML,
        // "#/details/1/": furnitureDetailsHTML,
        "#/mine": myFurnitureHTML,
        "#/mine/": myFurnitureHTML,
        "#/delete/1": "<h3>Delete{1} Page...</h3>",
        "#/delete/1/": "<h3>Delete{1} Page...</h3>",
    };
    // [...document.querySelectorAll(".col-md-4")].forEach(el=>el.style.padding="12px")
    const navigate = async () => {
        const hash = location.hash;

        if (hash === "" && hash === "#" && hash === "#/") {
            document.getElementById("container").innerHTML = defaultPageHtml;
        } else {
            if (hash.includes("#/details/")) {
                // I could try to put all this logic into a function, which I will call, if the hash includes "#/details/", to which function I will pass in as an argument the current key
                const reg = /-.{19}/;
                const key = hash.replace("#/details/", "").match(reg);
                if (key) {
                    console.log(key[0]);
                    const detailsHTML = templateFurnitureDetails(await (await fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/furniture/${key}.json`)).json());
                    document.getElementById("container").innerHTML = detailsHTML || "<h2>404 Not Found</h2>";
                }
            } else {
                document.getElementById("container").innerHTML = router[hash] || "<h2>404 Not Found</h2>";
            }

            // document.getElementById("change-html").innerHTML = router[hash] || "<h2>404 Not Found</h2>";
            // [...document.querySelectorAll("a")].forEach(a => a.style.display = "none");
        }
    };
    navigate();

    window.addEventListener("hashchange", navigate);
})();