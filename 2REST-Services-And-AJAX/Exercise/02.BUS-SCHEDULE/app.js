function solve() {
    const departButton = document.querySelector("#depart");
    const arriveButton = document.querySelector("#arrive");
    let infoBox = document.querySelector("span.info");

    let departResponse;

    function depart() {
        let id = departResponse ? departResponse.next : "depot";
        // let id = departResponse ? departResponse : "depot";
        const url = `https://judgetests.firebaseio.com/schedule/${id}.json`;

        fetch(url)
            .then(resp => resp.json())
            .then(res => {
                // departResponse = res;
                departResponse = res;
                //departResponse = res.next;
                // const name = departResponse.name;
                // const name = res.name;

                infoBox.textContent = `Next stop ${departResponse.name}`;
            })
            .catch(err => {
                infoBox.textContent = "Error";
                departButton.disabled = true;
                arriveButton.disabled = true;
            });

        departButton.disabled = true;
        arriveButton.removeAttribute("disabled");
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${departResponse.name}`;

        departButton.removeAttribute("disabled");
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();

// ["depot", "0361", "0812", "1567", "0067", "1844", "2053", "2037", "0098", "2057", "0566", "0631", "1931", "0296", "2571", "2572", "depot"]