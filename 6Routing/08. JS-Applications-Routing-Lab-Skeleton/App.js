const defaultPageHtml = `<div id="change-html"></div>

<a href="furniture.html#/create" style="display: block;">create</a>
<a href="furniture.html#/all" style="display: block;">all</a>
<a href="furniture.html#/details/1" style="display: block;">details/1</a>
<a href="furniture.html#/mine" style="display: block;">mine</a>
<a href="furniture.html#/delete/1" style="display: block;">delete/1</a>`;

const router = {
    "": defaultPageHtml,
    "#": defaultPageHtml,
    "#/": defaultPageHtml,
    "#/create": "<h3>Create Page...</h3>",
    "#/create/": "<h3>Create Page...</h3>",
    "#/all": "<h3>All Page...</h3>",
    "#/all/": "<h3>All Page...</h3>",
    "#/details/1": "<h3>Details{1} Page...</h3>",
    "#/details/1/": "<h3>Details{1} Page...</h3>",
    "#/mine": "<h3>Mine Page...</h3>",
    "#/mine/": "<h3>Mine Page...</h3>",
    "#/delete/1": "<h3>Delete{1} Page...</h3>",
    "#/delete/1/": "<h3>Delete{1} Page...</h3>",
};

const navigate = () => {
    if (location.hash !== "" && location.hash !== "#" && location.hash !== "#/") {
        document.getElementById("change-html").innerHTML = router[location.hash] || "<h2>404 Not Found</h2>";
        [...document.querySelectorAll("a")].forEach(a => a.style.display = "none");
    } else { // if (location.href.split("/").pop() === "furniture.html")
        document.getElementById("container").innerHTML = defaultPageHtml;
    }
};
navigate();

window.addEventListener("hashchange", navigate);