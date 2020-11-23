let messageValidArray = ["-recursive", "rm -rf /*", "hello world", "https://svn.myservice.com/downloads/", "%root%"];

messageValidArray.forEach(message => {
    if (message === undefined) {
        throw new Error("Invalid request header: Invalid Message");
    }

    if (message === undefined || (message !== '' && message.match(/[<>\\&'"]+/g) !== null)) {
        throw new Error("Invalid request header: Invalid Message");
    }
});

let messageInvalidArray = [
    //'<script>alert("xss vulnerable")</script>',
    "\r\n",
    //"&copy;",
    //'"value"',
    //"'; DROP TABLE"
];

messageInvalidArray.forEach(message => {
    if (message === undefined) {
        throw new Error("Invalid request header: Invalid Message");
    }

    if (message === undefined || (message !== '' && message.match(/[<>\\&'"]+/g) !== null)) {
        throw new Error("Invalid request header: Invalid Message");
    }
});