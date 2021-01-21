(async function () {
    let respHome = await fetch("../templates/home/home.hbs");
    let homeTemplateHtml = await respHome.text();
    const templateHome = Handlebars.compile(homeTemplateHtml);

    const homePageInnerHtml = templateHome({
        loggedIn: true,
        username: "John Doe",
        hasTeam: true,
        teamId: "-Mqdu45emdfdvjifv"
    });

    document.getElementById("main").innerHTML = homePageInnerHtml;
})();