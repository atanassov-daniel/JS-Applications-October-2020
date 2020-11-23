function loadCommits() {
    // Try it with Fetch API
    const username = document.querySelector("input#username");
    const repository = document.querySelector("input#repo");
    const commitsUl = document.querySelector("ul#commits");

    fetch(`https://api.github.com/repos/${username.value}/${repository.value}/commits`)
        .then(response => {
            commitsUl.innerHTML = "";

            if (response.ok === false) {
                let li = document.createElement("li");
                li.textContent = `Error: ${response.status} (${response.statusText})`;
                commitsUl.appendChild(li);
                return Promise.reject("Error");
            } else if (response.ok === true) {
                return response.json();
            }
        })
        .then(data => {
            data.forEach(obj => {
                let li = document.createElement("li");
                li.textContent = `${obj.commit.author.name}: ${obj.commit.message}`;
                commitsUl.appendChild(li);
            });
        })
        .catch(err => {});
}