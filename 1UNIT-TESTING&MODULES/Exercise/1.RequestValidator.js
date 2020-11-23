function validateHTTP(httpRequestObject) {
    if (httpRequestObject.method === undefined || ["GET", "POST", "DELETE", "CONNECT"].includes(httpRequestObject.method) === false) {
        throw new Error("Invalid request header: Invalid Method");
    }
    

    let uri = httpRequestObject.uri;
    if (uri === undefined) {
        throw new Error("Invalid request header: Invalid URI");
    }
    let match = uri.match(/[A-Za-z0-9.]+/);
    if (uri === '' || match === null || match[0] !== uri) {
        throw new Error("Invalid request header: Invalid URI");
    }

    
    if (httpRequestObject.version === undefined || ["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"].includes(httpRequestObject.version) === false) {
        throw new Error("Invalid request header: Invalid Version");
    }


    let message = httpRequestObject.message;
    if (message === undefined) {
        throw new Error("Invalid request header: Invalid Message");
    }

    if (message === undefined || (message !== '' && message.match(/[<>\\&'"]+/g) !== null)) {
        throw new Error("Invalid request header: Invalid Message");
    }


    return httpRequestObject;
}

console.log(validateHTTP({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
})); // should return the same object as was passed in
/*
validateHTTP({
    method: 'OPTIONS',
    uri: 'git.master',
    version: 'HTTP/1.1',
    message: '-recursive'
}); //Invalid request header: Invalid Method

validateHTTP({
    method: 'POST',
    uri: 'home.bash',
    message: 'rm -rf /*'
}); //Invalid request header: Invalid Version
*/