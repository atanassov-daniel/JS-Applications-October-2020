export const reg = async () => {
    let respHeader = await fetch("../templates/common/header.hbs");
    // let respHeader = await fetch("./templates/common/header.hbs");
    let headerTemplateHtml = await respHeader.text();
    let respFooter = await fetch("../templates/common/footer.hbs");
    // let respFooter = await fetch("./templates/common/footer.hbs");
    let footerTemplateHtml = await respFooter.text();

    Handlebars.registerPartial("header", headerTemplateHtml);
    Handlebars.registerPartial("footer", footerTemplateHtml);
};