function attachEvents() {
    let authorInput = document.querySelector("input#author");
    let contentInput = document.querySelector("input#content");

    document.querySelector("input#submit").addEventListener("click", function (e) { // SEND button
        if (authorInput.value.trim() === "" || contentInput.value.trim() === "") return;

        fetch(`https://rest-messanger.firebaseio.com/messanger.json`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "author": authorInput.value,
                    "content": contentInput.value,
                })
            })
            .then(response => response.json())
            .catch(error => console.error("An error has occured while trying to POST the message"));

        authorInput.value = "";
        contentInput.value = "";
    });

    document.querySelector("input#refresh").addEventListener("click", function (e) { // REFRESH button
        let messagesTextarea = document.querySelector("textarea#messages");

        messagesTextarea.value = "";

        fetch(`https://rest-messanger.firebaseio.com/messanger.json`)
            .then(response => response.json())
            .then(res => {
                Object.values(res).forEach(obj => {
                    messagesTextarea.value += `${obj.author}: ${obj.content}\n`;
                    // let li = document.createElement("div");
                    // li.textContent = `${obj.author}: ${obj.content}`;
                    // messagesTextarea.appendChild(li);
                    // messagesTextarea.appendChild(document.createElement("br"));
                });
            })
            .catch(error => console.error("An error has occured while trying to LOAD the messages"));
    });
}

attachEvents();