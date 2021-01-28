import {
    authService
} from "./services.js";

const routes = {
    '/': 'home-template',
    '/home': 'home-template',
    '/create-offer': 'create-offer-template',
    // '/': '-template',
    // '/': '-template',
    // '/': '-template',
    // '/': '-template',
};

const router = (path) => {
    console.log(path);
    let app = document.getElementById('app');

    let templateData = authService.getAuthData();
    // console.log(`router -> ${JSON.stringify(templateData)}`);

    let templateId = routes[path];

    let templateHtml = document.getElementById(templateId);

    if (templateHtml === null) templateHtml = document.getElementById('page-not-found-template');

    let template = Handlebars.compile(templateHtml.innerHTML);

    app.innerHTML = template(templateData);
};

const navigate = (path) => {
    history.pushState({}, '', path);

    router(path);
};

export {
    navigate
};