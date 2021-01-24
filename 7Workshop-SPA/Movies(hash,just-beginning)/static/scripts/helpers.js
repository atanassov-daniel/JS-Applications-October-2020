/* window.register = (e) => {
    e.preventDefault();

    const [email, pass, repeatPass] = [...document.querySelectorAll("input")].map(el => el.value);
    console.log([email, pass, repeatPass]);
}; */
window.addEventListener("hashchange", (e) => {
    console.log(location);

    if (document.querySelector("#register") !== null) document.querySelector("#register").addEventListener("click", (e) => {
        e.preventDefault();

        const [email, pass, repeatPass] = [...document.querySelectorAll("input")].map(el => el.value);
        console.log([email, pass, repeatPass]);
    });
});

location.hash = "#/register/";