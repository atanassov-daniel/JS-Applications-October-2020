function loadRepos() {
    // fetch(`https://restcountries.eu/rest/v2/alpha/col`)
    // https://restcountries.eu/rest/v2/      returns an array with all the countries

    const listElementEurope = document.querySelector("ul.Europe");

    fetch(`https://restcountries.eu/rest/v2/`)
        .then(res => res.json())
        .then(array => {
            array = array.filter(obj => obj.region === "Europe");

            array.forEach(obj => {
                let li = document.createElement("li");
                li.innerHTML += `${obj.name}<br>`;
                li.innerHTML += `<img src="${obj.flag}" width="300" height="150"></img>`;

                let image = li.querySelector("img");
                image.style.display = "none";
                // let a = `<li>${obj.name}<br></li>`;

                listElementEurope.appendChild(li);


                li.addEventListener("click", (e) => {
                    image.style.display === "none" ? image.style.display = "block" : image.style.display = "none";
                    
                    // да направя синьо и подчертано да излизат като при истински хиперлинк, или да измисля как да го направя с <a>

                    // li.addEventListener("mouseover", () => {
                    //     e.target.style.color = "blue";
                    // });
                });
            });

            // listElementEurope.innerHTML += `<li>${array[0].name}<br><img src="${array[0].flag}" width="300" height="150"></img></li>`;

            // listElementEurope.innerHTML += `<li>${array[1].name}<br><img src="${array[1].flag}" width="300" height="150"></img></li>`;

        });
}