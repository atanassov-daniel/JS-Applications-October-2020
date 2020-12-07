$(() => {
    const templateHTML = document.getElementById("monkey-template").innerHTML;
    const createMonkeysHTML = Handlebars.compile(templateHTML);

    document.querySelector("div.monkeys").innerHTML = createMonkeysHTML(monkeys);

    document.querySelectorAll("button.info").forEach(button => {
        button.addEventListener("click", function (e) {
            const infoElement = e.target.parentElement.querySelector("p");

            infoElement.style.display === "none" ? infoElement.style.display = "block" : infoElement.style.display = "none";
        });
    });
});