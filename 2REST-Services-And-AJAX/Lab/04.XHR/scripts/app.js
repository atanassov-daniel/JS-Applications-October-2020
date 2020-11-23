// Ctrl+Space
// Ctrl+Shift+Space
function loadRepos() {
    const url = `https://api.github.com/users/testnakov/repos`;

    const httpRequest = new XMLHttpRequest();

    httpRequest.addEventListener("readystatechange", function () {
        const res = document.querySelector("div#res");

        if (this.readyState === 4 && this.status !== 404) {
            res.innerHTML = this.responseText;
        }
    });

    httpRequest.open("GET", url);
    httpRequest.send();
}