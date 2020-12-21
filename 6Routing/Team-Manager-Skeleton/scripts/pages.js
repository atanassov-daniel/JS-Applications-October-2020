const authObject = {
    loggedIn: true,
    username: "John Doe",
    hasTeam: true,
    teamId: "-Mqdu45emdfdvjifv"
};


const regPartial = async (partialName, path) => {
    const partialHtml = await fileFetch(path);
    Handlebars.registerPartial(`${partialName}`, partialHtml);
};
const fileFetch = async (path) => { //isPartial: true
    const templateHtml = await (await fetch(path)).text();
    return templateHtml;
};
const templateFunction = async (path) => {
    const templateHtml = await fileFetch(path);
    const templateFunc = Handlebars.compile(templateHtml);
    return templateFunc;
};
const pageHtml = async (path, authObject) => {
    const templateFunc = await templateFunction(path);
    const pageHtml = templateFunc(authObject);
    return pageHtml;
};

const registerHeaderAndFooter = async () => {
    await regPartial("header", "../templates/common/header.hbs");
    await regPartial("footer", "../templates/common/footer.hbs");
};





export default {
    async home() {
        await registerHeaderAndFooter();
        const homePageHTML = await pageHtml("../templates/home/home.hbs", authObject);
        return homePageHTML;
    },
    async about() {
        await registerHeaderAndFooter();
        const aboutPageHTML = await pageHtml("../templates/about/about.hbs", authObject);
        return aboutPageHTML;
    },
    async create() {
        await registerHeaderAndFooter();
        await regPartial("createForm", "../templates/create/createForm.hbs");
        const createPageHTML = await pageHtml("../templates/create/createPage.hbs", authObject);
        return createPageHTML;
    },
    async edit() {
        await registerHeaderAndFooter();
        await regPartial("editForm", "../templates/edit/editForm.hbs");
        const editPageHTML = await pageHtml("../templates/edit/editPage.hbs", authObject);
        return editPageHTML;
    },
    async login() {
        await registerHeaderAndFooter();
        await regPartial("loginForm", "../templates/login/loginForm.hbs");
        const loginPageHTML = await pageHtml("../templates/login/loginPage.hbs", authObject);
        return loginPageHTML;
    },
    async register() {
        await registerHeaderAndFooter();
        await regPartial("registerForm", "../templates/register/registerForm.hbs");
        const registerPageHTML = await pageHtml("../templates/register/registerPage.hbs", authObject);
        return registerPageHTML;
    },
    async catalog1() {
        // for teamCatalog -> team
        await registerHeaderAndFooter();
        await regPartial("team", "../templates/catalog/team.hbs");
        const teamCatalogPageHTML = await pageHtml("../templates/catalog/teamCatalog.hbs", authObject);
        return teamCatalogPageHTML;
    },
    async catalog2() { // catalog2: async function () {
        // for details -> teamMember, teamControls
        await registerHeaderAndFooter();
        await regPartial("teamMember", "../templates/catalog/teamMember.hbs");
        await regPartial("teamControls", "../templates/catalog/teamControls.hbs");
        const detailsPageHTML = await pageHtml("../templates/catalog/details.hbs", authObject);
        return detailsPageHTML;
    },
};

// const obj = {catalog1: {partials: {    name,    path},pages: {    path,    objectArgument}},catalog2: {}};
// const generatePages (pageToBeGenerated) { home: f, about: f }