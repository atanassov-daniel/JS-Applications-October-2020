function getInfo() {
    const input = document.querySelector("#stopId");
    const resultDivStopName = document.querySelector("#stopName");
    const busesUl = document.querySelector("#buses");

    busesUl.innerHTML = "";

    if (["1287", "1308", "1327", "2334"].includes(input.value) === false) {
        // input.value = "";
        resultDivStopName.textContent = "Error";
    } else {
        fetch(`https://judgetests.firebaseio.com/businfo/${input.value}.json`)
            .then(res => res.json())
            .then(obj => {
                input.value = "";
                resultDivStopName.textContent = obj.name;

                Object.keys(obj.buses).forEach(busId => {
                    let time = obj.buses[busId];

                    const li = document.createElement("li");
                    li.textContent = `Bus ${busId} arrives in ${time} minutes`;
                    busesUl.appendChild(li);
                });
            });
        // .catch(error => {
        //     // input.value = "";
        //     resultDivStopName.textContent = "Error";
        // });
    }
}