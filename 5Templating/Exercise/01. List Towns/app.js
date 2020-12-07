function attachEvents() {
    document.getElementById("btnLoadTowns").addEventListener("click", function (e) {
        const inputTownsElement = document.getElementById("towns");
        const townsArray = inputTownsElement.value.split(", "); // example input -> Sofiq, Varna, Burgas, Ahtopol, Sliven, Plovdiv, Pernik, Pomorie, Primorsko, Blagoevgrad, Velingrad, Sunny beach
        if (townsArray[0].trim() === "") townsArray.shift(); // if the first element of the input is an empty string or just spaces, remove the first element

        const templateHtml = document.getElementById("town-template").innerHTML;
        const createTown = Handlebars.compile(templateHtml);

        const ulHTML = createTown(townsArray); // returns the innerHTML of the list of towns
        document.querySelector("div#root").innerHTML = ulHTML;
    });
}

attachEvents();