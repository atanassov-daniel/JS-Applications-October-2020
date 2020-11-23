// using Async/Await
function attachEvents() {
    const selectPosts = document.querySelector("select#posts");
    // display all blog posts and their comments.
    document.querySelector("button#btnLoadPosts").addEventListener("click", async function (e) {
        let response = await fetch(`https://blog-apps-c12bf.firebaseio.com/posts.json`);
        let data = await response.json();
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

    document.querySelector("button#btnViewPost").addEventListener("click", async function (e) {
        const selectedOption = Array.from(selectPosts.querySelectorAll("option")).find(option => option.selected);
        const postKey = selectedOption.value; // key
        const postId = selectedOption.id;

        let postResponse = await fetch(`https://blog-apps-c12bf.firebaseio.com/posts/${postKey}.json`);
        let postObject = await postResponse.json();

        document.querySelector("h1#post-title").textContent = postObject.title;
        document.querySelector("ul#post-body").textContent = postObject.body;


        let commentsResponse = await fetch(`https://blog-apps-c12bf.firebaseio.com/comments.json`);
        let allComments = await commentsResponse.json();

        const postCommentsUL = document.querySelector("ul#post-comments");
        postCommentsUL.innerHTML = "";

        Object.values(allComments).filter(comment => comment.postId === Number(postId)).forEach(comment => {
            const li = document.createElement("li");
            li.textContent = comment.text;
            postCommentsUL.appendChild(li);
        });
    });
}

attachEvents();