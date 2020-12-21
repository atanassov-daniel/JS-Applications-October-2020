export default async () => { // export const registerPartials = async () => {
    const respHeader = await fetch("../templates/common/header.hbs");
    // const respHeader = await fetch("./templates/common/header.hbs");
    const headerTemplateHtml = await respHeader.text();
    const respFooter = await fetch("../templates/common/footer.hbs");
    // const respFooter = await fetch("./templates/common/footer.hbs");
    const footerTemplateHtml = await respFooter.text();

    Handlebars.registerPartial("header", headerTemplateHtml);
    Handlebars.registerPartial("footer", footerTemplateHtml);
};