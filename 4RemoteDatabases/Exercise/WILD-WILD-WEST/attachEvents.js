function attachEvents() {
    const divAllPlayers = document.querySelector("div#players");

    async function loadAllPlayers() {
        const newPlayerHTML = (playerObj, key) => {
            let playerHTML =
                `<div class="player" id=${key}>
                    <div>Name: ${playerObj.name}</div>
                    <div>Money: ${playerObj.money}</div>
                    <div>Bullets: ${playerObj.bullets}</div>
                    <button class="play" id="${key}">Play</button>
                    <button class="delete" id="${key}">Delete</button>
                </div>`; // <button class="delete" id="${key}">Delete</button>

            return playerHTML;
        };

        const responseAllPlayers = await fetch(`https://wild-wild-west-db.firebaseio.com/players/.json`);
        const allPlayers = await responseAllPlayers.json(); // is an assocArray, the players objects from the database
        if (allPlayers === null) return;

        // const newlyCreatedDeleteButtons = [];
        Object.keys(allPlayers).forEach(key => {
            if (document.querySelector(`#${key}`) !== null) return;
            const playerObj = allPlayers[key];
            const playerHTML = newPlayerHTML(playerObj, key);
            divAllPlayers.innerHTML += playerHTML;

            /*
            let deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.id = key;
            deleteButton.textContent = "Delete";

            function del() {
                console.log("the delete event has actually worked");
            }
            deleteButton.addEventListener("click", del);
            document.querySelector(`div.player#${key}`).appendChild(deleteButton);
            */

            // newlyCreatedDeleteButtons.push(document.querySelector(`div.player#${key}`));

            // Array.from(document.querySelectorAll(`button.delete`)).filter(button => button.id === key)[0].addEventListener("click", (e) => {
            //     console.log(e.target);
            // }); // беше div.player по едно време
            // #${key}

            // const currentDeleteButton = document.querySelector(`button#${key}.delete`);
            // console.log(currentDeleteButton);
            // currentDeleteButton.addEventListener("click", (e) => console.log("the delet event has actually worked"));
            // const del = (e) => console.log("the delete event has actually worked");
            // currentDeleteButton.addEventListener("click", del);
        });

        const del = async (e) => {
            const response = await fetch(`https://wild-wild-west-db.firebaseio.com/players/${e.target.id}.json`, {
                method: "DELETE"
            });
            if (response.ok === true) e.target.parentElement.remove();
            else alert("The player couldn't be deleted. Please try again!");
        };

        // console.log(newlyCreatedDeleteButtons);
        // for (let i = 0; i < newlyCreatedDeleteButtons.length; i++) {
        //     newlyCreatedDeleteButtons[i].addEventListener("click", del);
        // }

        const allDeleteButtons = [...document.querySelectorAll(`button.delete`)];
        allDeleteButtons.forEach(button => {
            // ["Nick", "George", "Dragan", "Pesho", "Ivan", "Petkan", "Cankan", "Dobrin", "Canko", "uiyucfhgjh", "sfdf", "tikvi4ki"]
            button.removeEventListener("click", del);
            button.addEventListener("click", del);
        });


        const play = async (e) => {
            const canvas = document.querySelector("#canvas");
            const saveButton = document.querySelector("#save");
            const reloadButton = document.querySelector("#reload");

            canvas.style.display = "block";
            saveButton.style.display = "block";
            reloadButton.style.display = "block";

            const playerKey = e.target.id;

            const responsePlayer = await fetch(`https://wild-wild-west-db.firebaseio.com/players/${playerKey}.json`);
            const player = await responsePlayer.json();

            loadCanvas(player);
            document.querySelector("#save").addEventListener("click", (e) => {
                const intervalId = canvas.intervalId;
                clearInterval(intervalId);
                fetch(`https://wild-wild-west-db.firebaseio.com/players/${playerKey}.json`, {
                    method: "PUT",
                    body: JSON.stringify(player)
                });

                canvas.style.display = "none";
                saveButton.style.display = "none";
                reloadButton.style.display = "none";

                let [, moneyDiv, bulletsDiv] = document.querySelector(`div.player#${playerKey}`).querySelectorAll("div");
                moneyDiv.innerText = `Money: ${player.money}`;
                bulletsDiv.innerText = `Bullets: ${player.bullets}`;
            });
        };

        const allPlayButtons = [...document.querySelectorAll(`button.play`)];
        allPlayButtons.forEach(button => {
            // ["Nick", "George", "Dragan", "Pesho", "Ivan", "Petkan", "Cankan", "Dobrin", "Canko", "uiyucfhgjh", "sfdf", "tikvi4ki"]
            button.removeEventListener("click", play);
            button.addEventListener("click", play);
        });
    }
    loadAllPlayers();


    const inputName = document.querySelector("input#addName");
    async function addPlayer(e) {
        const validatePlayerName = async (name) => {
            if (name === "" || Number.isNaN(Number(name)) === false) { // if the name is empty, or the input is a number( is not NaN)                                    //         || Number(name) === 0 
                alert("Please provide a valid name of a player");
                return "invalid name";
            }

            const responseAllPlayers = await fetch(`https://wild-wild-west-db.firebaseio.com/players/.json`);
            const allPlayers = await responseAllPlayers.json(); // is an assocArray, the players objects from the database

            // let allNamesArray;
            // if (allPlayers === null) allNamesArray = Object.values(allPlayers).map(playerObj => playerObj.name); // if there are any players in the database, map them into an array with just their names
            if (allPlayers === null) return;
            let allNamesArray = Object.values(allPlayers).map(playerObj => playerObj.name);

            // allPlayers === null || 
            // if there are no players in the database or 
            if (allNamesArray.includes(name) === true) { // if there is no player with the provided name, he can be added to the database
                alert("The name of the player is already in the database, please provide another one!");
                return "invalid name";
            }
        };

        const name = inputName.value.trim();

        if (await validatePlayerName(name) === "invalid name") return;

        const responseAddedPlayer = await fetch(`https://wild-wild-west-db.firebaseio.com/players/.json`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                money: 500,
                bullets: 6
            })
        });
        const keyAddedPlayer = await responseAddedPlayer.json();
        console.log(keyAddedPlayer);
        inputName.value = "";
        loadAllPlayers();
    }
    document.querySelector("button#addPlayer").addEventListener("click", addPlayer);

}


/*
const getAllPlayers = async () => {
    const responseAllPlayers = await fetch(`https://wild-wild-west-db.firebaseio.com/players/.json`);
    const allPlayers = await responseAllPlayers.json(); // is an assocArray, the players objects from the database

    let allNamesArray;
    if (allPlayers !== null) allNamesArray = Object.values(allPlayers).map(playerObj => playerObj.name); // if there are any players in the database, map them into an array with just their names
};
*/