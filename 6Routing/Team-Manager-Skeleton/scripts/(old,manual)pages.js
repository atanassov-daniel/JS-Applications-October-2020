import registerPartials from "./registerPartials.js";

/* const fileFetch = async () => {};
const part = async () => {
    const partialHtml = await r();
    Handlebars.registerPartial(`${name}`, partialHtml);
}; */

const authObject = {
    loggedIn: true,
    username: "John Doe",
    hasTeam: true,
    teamId: "-Mqdu45emdfdvjifv"
};

export default {
    async home() {
        await registerPartials(); // otherwise there was a mistake that the helper "header" does not exist and so the templates didn;t work at all

        // const respHome = await fetch("../templates/home/home.hbs");
        // const homeTemplateHtml = await respHome.text();
        const homeTemplateHtml = await (await fetch(`../templates/home/home.hbs`)).text();
        const templateHome = Handlebars.compile(homeTemplateHtml);

        const homePageHTML = templateHome(authObject);

        return homePageHTML;
    },
    async about() {
        await registerPartials();

        // const respAbout = await fetch("../templates/about/about.hbs");
        // const aboutTemplateHtml = await respAbout.text();
        const aboutTemplateHtml = await (await fetch("../templates/about/about.hbs")).text();
        const templateAbout = Handlebars.compile(aboutTemplateHtml);

        const aboutPageHTML = templateAbout(authObject);

        return aboutPageHTML;
    },
    async create() {
        await registerPartials();

        const createForm = await (await fetch("../templates/create/createForm.hbs")).text();
        Handlebars.registerPartial("createForm", createForm);

        const createPage = await (await fetch("../templates/create/createPage.hbs")).text();
        const templateCreatePage = Handlebars.compile(createPage);

        const createPageHTML = templateCreatePage(authObject);

        return createPageHTML;
    },
    async edit() {
        await registerPartials();

        const editForm = await (await fetch("../templates/edit/editForm.hbs")).text();
        Handlebars.registerPartial("editForm", editForm);

        const editPage = await (await fetch("../templates/edit/editPage.hbs")).text();
        const templateEditPage = Handlebars.compile(editPage);

        const editPageHTML = templateEditPage(authObject);

        return editPageHTML;
    },
    async login() {
        await registerPartials();

        const loginForm = await (await fetch("../templates/login/loginForm.hbs")).text();
        Handlebars.registerPartial("loginForm", loginForm);

        const loginPage = await (await fetch("../templates/login/loginPage.hbs")).text();
        const templateLoginPage = Handlebars.compile(loginPage);

        const loginPageHTML = templateLoginPage(authObject);

        return loginPageHTML;
    },
    async register() {
        await registerPartials();

        const registerForm = await (await fetch("../templates/register/registerForm.hbs")).text();
        Handlebars.registerPartial("registerForm", registerForm);

        const registerPage = await (await fetch("../templates/register/registerPage.hbs")).text();
        const templateRegisterPage = Handlebars.compile(registerPage);

        const registerPageHTML = templateRegisterPage(authObject);

        return registerPageHTML;
    },
    async catalog1() {
        // for details -> teamMember, teamControls
        // for teamCatalog -> team
        await registerPartials();
        // const teamMember = await (await fetch("../templates/catalog/teamMember.hbs")).text();
        // const teamControls = await (await fetch("../templates/catalog/teamControls.hbs")).text();
        // const details = await (await fetch("../templates/catalog/details.hbs")).text();
        const team = await (await fetch("../templates/catalog/team.hbs")).text();
        Handlebars.registerPartial("team", team);
        const teamCatalog = await (await fetch("../templates/catalog/teamCatalog.hbs")).text();

        const templateTeamCatalogPage = Handlebars.compile(teamCatalog);
        const teamCatalogPageHTML = templateTeamCatalogPage(authObject);

        return teamCatalogPageHTML;
    },
    async catalog2() {
        // for details -> teamMember, teamControls
        // for teamCatalog -> team
        await registerPartials();

        const teamMember = await (await fetch("../templates/catalog/teamMember.hbs")).text();
        Handlebars.registerPartial("teamMember", teamMember);
        const teamControls = await (await fetch("../templates/catalog/teamControls.hbs")).text();
        Handlebars.registerPartial("teamControls", teamControls);

        const details = await (await fetch("../templates/catalog/details.hbs")).text();

        const templateDetailsPage = Handlebars.compile(details);
        const detailsPageHTML = templateDetailsPage(authObject);

        return detailsPageHTML;
    },

};

// const generatePages (pageToBeGenerated) { home: f, about: f }






// const home = async () => {};
// const about = async () => {};
// export { home, about };