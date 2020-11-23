// using Async/Await
async function loadCommits() {
    const username = document.querySelector("input#username");
    const repository = document.querySelector("input#repo");
    const commitsUl = document.querySelector("ul#commits");

    const response = await fetch(`https://api.github.com/repos/${username.value}/${repository.value}/commits`);
    commitsUl.innerHTML = "";

    if (response.ok === false) {
        const li = document.createElement("li");
        li.textContent = `Error: ${response.status} (${response.statusText})`;
        commitsUl.appendChild(li);
        return;
    }

    const responseJSON = await response.json();

    responseJSON.forEach(obj => {
        const li = document.createElement("li");
        li.textContent = `${obj.commit.author.name}: ${obj.commit.message}`;
        commitsUl.appendChild(li);
    });
}