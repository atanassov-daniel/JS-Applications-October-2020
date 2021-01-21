fetch("./templates/common/header.hbs").then(resp => resp.text()).then(htmlTemplate => {
    if (document.querySelector("header")) {
        document.querySelector("header").remove();
    }

    const template = Handlebars.compile(htmlTemplate);
    const headerNode = document.createElement("header");
    headerNode.classList.add("header");
    headerNode.innerHTML = template({
        "loggedIn": false,
        "username": "John Doe"
    });

    document.querySelector("body").prepend(headerNode);
});