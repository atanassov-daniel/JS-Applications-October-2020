function attachEvents() {
    const selectPosts = document.querySelector("select#posts");
    // display all blog posts and their comments.
    document.querySelector("button#btnLoadPosts").addEventListener("click", function (e) {
        fetch(`https://blog-apps-c12bf.firebaseio.com/posts.json`)
            .then(response => response.json())
            .then(data => {
                // check for the id down below where I'm currently checking for the option.value
                Object.keys(data).forEach(key => {
                    const option = document.createElement("option");
                    option.value = key;
                    option.id = data[key].id;
                    option.textContent = data[key].title;

                    // check if there is already an option with this value
                    if (Array.from(selectPosts.querySelectorAll("option")).map(el => el.value).includes(option.value) == false) {
                        selectPosts.appendChild(option);
                    }
                });
            });
    });

    document.querySelector("button#btnViewPost").addEventListener("click", function (e) {
        const selectedOption = Array.from(selectPosts.querySelectorAll("option")).find(option => option.selected);
        const postKey = selectedOption.value; // key
        const postId = selectedOption.id;

        fetch(`https://blog-apps-c12bf.firebaseio.com/posts/${postKey}.json`)
            .then(response => response.json())
            .then(object => {
                document.querySelector("h1#post-title").textContent = object.title;
                document.querySelector("ul#post-body").textContent = object.body;
            });

        fetch(`https://blog-apps-c12bf.firebaseio.com/comments.json`)
            .then(response => response.json())
            .then(allComments => {
                const postCommentsUL = document.querySelector("ul#post-comments");
                postCommentsUL.innerHTML = "";

                Object.values(allComments).filter(comment => comment.postId === Number(postId)).forEach(comment => {
                    const li = document.createElement("li");
                    li.textContent = comment.text;
                    postCommentsUL.appendChild(li);
                });
            });
    });
}

attachEvents();