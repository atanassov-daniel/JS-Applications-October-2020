import {
    logOut
} from "./auth.js";

const registerPartial = async (partialName, path) => {
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
    await registerPartial("header", "../templates/common/header.hbs");
    await registerPartial("footer", "../templates/common/footer.hbs");
};

const generatePages = {
    async home(obj) {
        await registerHeaderAndFooter();
        const homePageHTML = await pageHtml("../templates/home/home.hbs", obj);
        return homePageHTML;
    },
    async about(obj) {
        await registerHeaderAndFooter();
        const aboutPageHTML = await pageHtml("../templates/about/about.hbs", obj);
        return aboutPageHTML;
    },
    async create(obj) {
        await registerHeaderAndFooter();
        await registerPartial("createForm", "../templates/create/createForm.hbs");
        const createPageHTML = await pageHtml("../templates/create/createPage.hbs", obj);
        return createPageHTML;
    },
    async edit(obj) {
        await registerHeaderAndFooter();
        await registerPartial("editForm", "../templates/edit/editForm.hbs");
        const editPageHTML = await pageHtml("../templates/edit/editPage.hbs", obj);
        return editPageHTML;
    },
    async login(obj) {
        await registerHeaderAndFooter();
        await registerPartial("loginForm", "../templates/login/loginForm.hbs");
        const loginPageHTML = await pageHtml("../templates/login/loginPage.hbs", obj);
        return loginPageHTML;
    },
    async register(obj) {
        await registerHeaderAndFooter();
        await registerPartial("registerForm", "../templates/register/registerForm.hbs");
        const registerPageHTML = await pageHtml("../templates/register/registerPage.hbs", obj);
        return registerPageHTML;
    },
    async catalog(obj) {
        // for teamCatalog -> team
        await registerHeaderAndFooter();
        await registerPartial("team", "../templates/catalog/team.hbs");
        const teamCatalogPageHTML = await pageHtml("../templates/catalog/teamCatalog.hbs", obj);
        return teamCatalogPageHTML;
    },
    async details(obj) { // catalog2: async function () {
        // for details -> teamMember, teamControls
        await registerHeaderAndFooter();
        await registerPartial("teamMember", "../templates/catalog/teamMember.hbs");
        await registerPartial("teamControls", "../templates/catalog/teamControls.hbs");
        const detailsPageHTML = await pageHtml("../templates/catalog/details.hbs", obj);
        return detailsPageHTML;
    },
    async logout() {
        logOut();
        // location.hash = "#/home/";
    },
    async unauthorized() {
        await registerHeaderAndFooter();
        const unauthorizedPageHTML = await pageHtml("../templates/common/unauthorized.hbs");
        return unauthorizedPageHTML;
    }
};

export default generatePages;

// const generatePages (pageToBeGenerated) { home: f, about: f }