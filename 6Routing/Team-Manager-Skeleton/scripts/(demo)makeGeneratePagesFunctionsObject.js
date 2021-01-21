function createGenerateObject(configObject) {
    const outputObject = {};

    const pageNamesArray = Object.keys(configObject);
    pageNamesArray.forEach(pageName => {
        const currentPage = configObject[pageName];
        const {
            partials,
            page
        } = currentPage;

        const partialNames = Object.keys(partials);

        outputObject[pageName] = async () => {
            await registerHeaderAndFooter();

            partialNames.forEach(name => {
                registerPartial(`${name}`, partials[name]);
            });

            const htmlPage = await pageHtml(page.name, page.objectArgument);
            return htmlPage;
        };
    });

    return outputObject;
}
const obj = {
    catalog1: {
        partials: {
            "team": "../templates/catalog/team.hbs"
        },
        page: {
            name: "../templates/catalog/teamCatalog.hbs",
            objectArgument: authObject
        }
    },
    catalog2: {
        partials: {
            "teamMember": "../templates/catalog/teamMember.hbs",
            "teamControls": "../templates/catalog/teamControls.hbs"
        },
        page: {
            name: "../templates/catalog/details.hbs",
            objectArgument: authObject
        }
    }
};

let gen = createGenerateObject(obj);
(async () => {
    console.log(await gen.catalog1());
})();