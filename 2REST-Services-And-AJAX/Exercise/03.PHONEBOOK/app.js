function attachEvents() {
    const elements = {
        loadButton: document.querySelector("button#btnLoad"),
        createButton: document.querySelector("button#btnCreate"),
        phonebookList: document.querySelector("ul#phonebook"),
        personInput: document.querySelector("input#person"),
        phoneInput: document.querySelector("input#phone")
    };

    function deleteContact() {
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${this.id}.json`, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(() => load());
    }

    // Add an event listener for the functionality needed when clicking a button
    elements.createButton.addEventListener("click", function (e) {
        let personValue = elements.personInput.value;
        let phoneValue = elements.phoneInput.value;
        elements.personInput.value = "";
        elements.phoneInput.value = "";

        if (personValue.trim() === "" || phoneValue.trim() === "") return;
        
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "person": personValue,
                    "phone": phoneValue
                })
            })
            .then(resp => resp.json())
            .then(() => load())
            .catch(error => console.error("An error has occured while trying to POST the new contact"));
    });

    // Implement the functionality needed when clicking on the "Load" button
    function load(e) {
        elements.phonebookList.innerHTML = "";

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`)
            .then(resp => resp.json())
            .then(data => {
                Object.keys(data).forEach(key => {
                    let contactObject = data[key];

                    let deleteButton = document.createElement(`button`);
                    deleteButton.id = key;
                    deleteButton.textContent = "Delete";
                    deleteButton.addEventListener("click", deleteContact);

                    let li = document.createElement("li");
                    li.textContent = `${contactObject.person}: ${contactObject.phone} `;
                    li.appendChild(deleteButton);
                    elements.phonebookList.appendChild(li);
                });
            })
            .catch(error => console.error("An error has occured while loading the phonebook"));
    }

    // Add an event listener for the functionality needed when clicking a button
    elements.loadButton.addEventListener("click", load);
}

// { "person": "Gizmo", "phone": "1234567890" }
// { "person": "котка", "phone": "5555" }
// { "person": "Maya", "phone": "+359 884579625" }
// { "person": "John", "phone": "+359 887412598" }
// { "person": "Nicolle", "phone": "+359 885698742" }
attachEvents();