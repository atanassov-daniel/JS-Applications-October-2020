(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        // TODO: Render cat template and attach events
        const catTemplateHTML = document.getElementById("cat-template").innerHTML;
        const createCatsHTML = Handlebars.compile(catTemplateHTML);

        document.querySelector("section#allCats").innerHTML = createCatsHTML(cats);
        document.querySelectorAll("li div.info button.showBtn").forEach(button => button.addEventListener("click", showStatusHandler));
    }

    function showStatusHandler(e) {
        // onclick="showStatusHandler()"
        console.log(`it has worked`);
        const moreInfoElement = e.target.parentElement.querySelector("div.status");

        if (moreInfoElement.style.display === "none") {
            moreInfoElement.style.display = "block";
            e.target.textContent = "Hide status code";
        } else {
            moreInfoElement.style.display = "none";
            e.target.textContent = "Show status code";
        }
    }
})();