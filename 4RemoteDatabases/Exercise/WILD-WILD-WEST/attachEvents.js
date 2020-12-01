function attachEvents() {
    const divAllPlayers = document.querySelector("div#players");

    async function loadAllPlayers() {
        const newPlayerHTML = (playerObj, key) => {
            let playerHTML = `<div class="player" id=${key}>
            <div>Name: ${playerObj.name}</div>
            <div>Money: ${playerObj.money}</div>
            <div>Bullets: ${playerObj.bullets}</div>
            <button class="play">Play</button>
            <button class="delete">Delete</button>
        </div>`;

            return playerHTML;
        };

        const responseAllPlayers = await fetch(`https://wild-wild-west-db.firebaseio.com/players/.json`);
        const allPlayers = await responseAllPlayers.json(); // is an assocArray, the players objects from the database
        if (allPlayers === null) return;

        Object.keys(allPlayers).forEach(key => {
            if (document.querySelector(`#${key}`) !== null) return;
            const playerObj = allPlayers[key];
            const playerHTML = newPlayerHTML(playerObj, key);
            divAllPlayers.innerHTML += playerHTML;
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

            let allNamesArray;
            if (allPlayers !== null) allNamesArray = Object.values(allPlayers).map(playerObj => playerObj.name); // if there are any players in the database, map them into an array with just their names

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