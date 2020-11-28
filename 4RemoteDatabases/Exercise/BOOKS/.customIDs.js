fetch(`https://books-db1.firebaseio.com/books.json`, {
        method: "PATCH",
        body: JSON.stringify({
            "10": {
                "author": "some author 10",
                "title": "some book 10",
                "isbn": "some isbn 10"
            }
        })
    })
    .then(resp => resp.json())
    .then(r => console.log(r));