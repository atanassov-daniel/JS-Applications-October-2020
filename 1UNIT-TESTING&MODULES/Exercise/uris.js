let uriValidArray = ["svn.public.catalog", "git.master", "version1.0", "for..of", ".babelrc", "c"]

uriValidArray.forEach(uri => {
    if (uri === undefined) {
        throw new Error("Invalid request header: Invalid URI");
    }

    let match = uri.match(/[A-Za-z0-9.]+/);

    if (uri === '' || match === null || match[0] !== uri) {
        throw new Error("Invalid request header: Invalid URI");
    }
});

let uriInvalidArray = [
    "%appdata%",
    "apt-get",
    " ",
    "home$",
    "define apps",
    'documents"',
];

uriInvalidArray.forEach(uri => {
    if (uri === undefined) {
        throw new Error("Invalid request header: Invalid URI");
    }

    let match = uri.match(/[A-Za-z0-9.]+/);

    if (uri === '' || match === null || match[0] !== uri) {
        throw new Error("Invalid request header: Invalid URI");
    }
});