function loadRepos() {
	const username = document.querySelector("#username").value;

	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(resp => resp.json())
		.then(reposArray => {
			document.querySelector("ul#repos").innerHTML = "";

			reposArray.forEach(repo => document.querySelector("ul#repos").innerHTML += `<li><a href="${repo.html_url}">${repo.full_name}</a></li>`);
		}).catch(err => {
			document.querySelector("ul#repos").innerHTML = "<li>Error</li>";
		});
	// If an error occurs (like 404 “Not Found”), append to the list a list-item with text the current instead
}