// ако натисна на някой EDIT без да съм submit-нал предния натиснат няма да се получи
// const {
//     editBook,
//     deleteHandler
// } = (function () {
//     return {
async function editBook(e) {
    const bookToChange = e.target.parentElement.parentElement;
    const bookID = bookToChange.id;

    const oldTitle = bookToChange.querySelector(".title").textContent;
    const oldAuthor = bookToChange.querySelector(".author").textContent;
    const oldIsbn = bookToChange.querySelector(".isbn").textContent;

    const form = document.createElement("form");
    form.id = "edit-form";
    form.style.display = "none";
    form.innerHTML = `<h3>FORM</h3>
            <label>TITLE</label>
            <input type="title" id="new-title" placeholder="New title..." value="${oldTitle}">
            <label>AUTHOR</label>
            <input type="title" id="new-author" placeholder="New author..." value="${oldAuthor}">
            <label>ISBN</label>
            <input type="title" id="new-isbn" placeholder="New isbn..." value="${oldIsbn}">
            <button id="edit-form-submit-button">Submit change</button>`;
    if (document.querySelectorAll("form#edit-form").length >= 1) return;
    // if (document.querySelectorAll("form#edit-form")) return;
    document.querySelector("body").appendChild(form);

    document.getElementById("new-book-form").style.display = "none"; // make the form for editing the book visible
    form.style.display = "block"; // make the form for editing the book visible

    // alert("Please fill in the form down below");
    document.getElementById("edit-form-submit-button").scrollIntoView({
        behavior: "smooth"
    });

    document.getElementById("edit-form-submit-button").addEventListener("click", async function submitChange(e) {
        e.preventDefault();

        const [title, author, isbn] = [document.getElementById("new-title"), document.getElementById("new-author"), document.getElementById("new-isbn")];
        const [titleValue, authorValue, isbnValue] = [title.value, author.value, isbn.value];

        const newBook = {
            "title": titleValue.trim(),
            "author": authorValue.trim(),
            "isbn": isbnValue.trim()
        };
        if (titleValue.trim() === "" || authorValue.trim() === "" || isbnValue.trim() === "") {
            alert("Please fill in all fields of the form");
            return;
        }

        const response = await fetch(`${baseUrl}/${bookID}.json`, { // ${}
            method: "PATCH",
            body: JSON.stringify(newBook)
        });
        if (response.ok === false) {
            console.log(`${response.status} (${response.statusText}) - The entry couldn't be updated on the server`);
            return;
        }

        const bookObj = await response.json();
        // console.log(bookObj);
        document.getElementById("edit-form").remove();
        document.getElementById("new-book-form").style.display = "block";

        const row = [...document.querySelectorAll("tr")].filter(book => book.id === bookID)[0];
        row.querySelector("td.title").textContent = newBook.title;
        row.querySelector("td.author").textContent = newBook.author;
        row.querySelector("td.isbn").textContent = newBook.isbn;

        document.getElementById(bookID).scrollIntoView({
            behavior: "smooth"
        });
    });
} //,
// 
async function deleteHandler(e) {
    const row = e.target.parentElement.parentElement;

    const response = await fetch(`${baseUrl}/${row.id}.json`, {
        method: "DELETE"
    });
    response.ok === true ? row.remove() : console.log(`${response.status} (${response.statusText}) - The entry couldn't be deleted from the server`);
}
// };
// })();

// онези "AT THE SERVER SIDE" за DELETE и EDIT в условията значат ли, че трябва да трия само от сървъра, а при натискане на бутона LOAD ALL BOOKS само да трябва да ги упдейтвам, в това май няма много логика
const baseUrl = `https://books-db1.firebaseio.com/books`;
const tableBooks = document.querySelectorAll("table")[0];
tableBooks.id = "books-table";
const tableBody = tableBooks.querySelector("tbody");
// load all books
async function loadAllBooks(e) {
    const response = await fetch(`${baseUrl}.json`);
    if (response.ok === false) return;

    const books = await response.json();
    Object.keys(books).forEach(key => {
        if ([...tableBody.querySelectorAll("tr")].map(tr => tr.id).indexOf(key) !== -1) return;

        const bookObj = books[key];

        const bookRow = document.createElement("tr");
        bookRow.id = key;
        const htmlBookRow = `<td class="title">${bookObj.title}</td><td class="author">${bookObj.author}</td><td class="isbn">${bookObj.isbn}</td>`;
        bookRow.innerHTML = htmlBookRow;
        // <td><button>Edit</button><button>Delete</button></td>
        const tdActions = document.createElement("td");
        tdActions.className = "actions";
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        tdActions.appendChild(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        tdActions.appendChild(deleteButton);

        editButton.addEventListener("click", editBook);
        deleteButton.addEventListener("click", deleteHandler);

        bookRow.appendChild(tdActions);

        tableBody.appendChild(bookRow);
    });
}

loadAllBooks(); // load all books when the page loads
document.getElementById("loadBooks").addEventListener("click", loadAllBooks); // load the books when the button gets clicked

// set an id to the form for a new item
document.querySelector("form").id = "new-book-form";
// get the 'Submit' button of the form
const formSubmitButton = [...document.querySelectorAll(`form button`)].filter(button => button.innerText = "Submit")[0];
formSubmitButton.id = "form-submit-button";

const [title, author, isbn] = [document.getElementById("title"), document.getElementById("author"), document.getElementById("isbn")];

formSubmitButton.addEventListener("click", async function postNewBook(e) {
    // maybe I should try and check if there is already an entry with the same title, author and isbn
    e.preventDefault();

    const [titleValue, authorValue, isbnValue] = [title.value, author.value, isbn.value];
    const newBook = {
        "title": titleValue.trim(),
        "author": authorValue.trim(),
        "isbn": isbnValue.trim()
    };
    if (titleValue.trim() === "" || authorValue.trim() === "" || isbnValue.trim() === "") {
        alert("Please fill in all fields of the form");
        return;
    }

    const response = await fetch(`${baseUrl}.json`, {
        method: "POST",
        body: JSON.stringify(newBook)
    });
    response.ok === true ? loadAllBooks() : console.log(`${response.status} (${response.statusText}) - The entry couldn't be posted on the server`);

    title.value = "";
    author.value = "";
    isbn.value = "";
});