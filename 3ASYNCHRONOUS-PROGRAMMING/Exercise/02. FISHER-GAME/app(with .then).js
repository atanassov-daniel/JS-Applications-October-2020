function attachEvents() {
    const catchesDiv = document.querySelector("div#catches");

    // "Load" button
    function loadHandler(event) {
        fetch(`https://fisher-game.firebaseio.com/catches.json`)
            .then(resp => resp.json())
            .then(catchesObj => {
                Object.keys(catchesObj).forEach(key => {
                    const obj = catchesObj[key];

                    const [dataId, anglerName, weight, species, location, bait, captureTime] = [key, obj.angler, obj.weight, obj.species, obj.location, obj.bait, obj.captureTime];

                    const pattern = `<div class="catch" data-id="${dataId}">
                    <label>Angler</label>
                    <input type="text" class="angler" value="${anglerName}"/>
                    <hr>
                    <label>Weight</label>
                    <input type="number" class="weight" value="${weight}"/>
                    <hr>
                    <label>Species</label>
                    <input type="text" class="species" value="${species}"/>
                    <hr>
                    <label>Location</label>
                    <input type="text" class="location" value="${location}"/>
                    <hr>
                    <label>Bait</label>
                    <input type="text" class="bait" value="${bait}"/>
                    <hr>
                    <label>Capture Time</label>
                    <input type="number" class="captureTime" value="${captureTime}"/>
                    <hr>
                    <button class="update" onclick="updateHandler(event)">Update</button>
                    <button class="delete" onclick="deleteHandler(event)">Delete</button>
                </div>`;

                    if (!document.querySelector(`div.catch[data-id="${dataId}"]`)) catchesDiv.innerHTML += pattern;
                });
            })
            .catch(err => console.log(err));
    }
    document.querySelector("button.load").addEventListener("click", loadHandler);


    // "Add" button
    document.querySelector("button.add").addEventListener("click", function (e) {
        const addFormInputFields = Array.from(document.querySelector("fieldset#addForm").children).filter(el => el.localName === "input");
        const values = addFormInputFields.map(el => el.value.trim());
        const [angler, weight, species, location, bait, captureTime] = values;

        fetch(`https://fisher-game.firebaseio.com/catches.json`, {
                method: "POST",
                body: JSON.stringify({
                    angler,
                    weight,
                    species,
                    location,
                    bait,
                    captureTime
                })
            })
            .then(resp => resp.json())
            .then(() => loadHandler())
            .catch(err => console.log(err));

        addFormInputFields.forEach(el => el.value = "");
    });
}

attachEvents();

function updateHandler(event) {
    const currentCatchDiv = event.target.parentElement;
    const catchId = currentCatchDiv.attributes["data-id"].nodeValue;

    const arrayFormInputFields = Array.from(event.target.parentElement.children).filter(el => el.localName === "input");
    const values = arrayFormInputFields.map(el => el.value.trim());
    const [angler, weight, species, location, bait, captureTime] = values;

    fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, {
            method: "PUT",
            body: JSON.stringify({
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            })
        })
        .then(resp => resp.json())
        .catch(err => console.log(err));
}

function deleteHandler(event) {
    const currentCatch = event.target.parentElement;
    const dataId = currentCatch.attributes["data-id"].nodeValue;

    fetch(`https://fisher-game.firebaseio.com/catches/${dataId}.json`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(() => currentCatch.remove())
        .catch(err => console.log(err));
}