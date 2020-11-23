let promise = new Promise((a, b) => { // (b, a)  -> важно е не как се казват, а кое е първо и кое е второ
    console.log("everything has begun");

    setTimeout(() => {
        // resolve("message");
        a("message"); // fulfilled // rejected

        // reject("message");
        b("message"); // rejected // fulfilled
    }, 3000);
});
console.log(promise);
promise
    .then(res => {
        console.log("Promise has been fulfilled");
    })
    .catch(err => {
        console.log("Promise has failed");
    })
    .finally(() => {
        console.log("The end has come");
    });