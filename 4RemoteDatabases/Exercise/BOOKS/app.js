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
        const htmlBookRow = `<td>${bookObj.title}</td><td>${bookObj.author}</td><td>${bookObj.isbn}</td>`;
        bookRow.innerHTML = htmlBookRow;
        // <td><button>Edit</button><button>Delete</button></td>
        const td = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        td.appendChild(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        td.appendChild(deleteButton);
        deleteButton.addEventListener("click", async function deleteHandler(e) {
            const row = e.target.parentElement.parentElement;

            await fetch(`${baseUrl}/${row.id}.json`, {
                    method: "DELETE"
                })
                .then(resp => resp.ok === true ? row.remove() : console.log(`${resp.status} (${resp.statusText}) - The entry couldn't be deleted from the server`));
        });

        bookRow.appendChild(td);

        tableBody.appendChild(bookRow);
    });
}
loadAllBooks(); // load all books when the page loads
document.getElementById("loadBooks").addEventListener("click", loadAllBooks); // load the books when the button gets clicked

// get the 'Submit' button of the form
const formSubmitButton = [...document.querySelectorAll(`form button`)].filter(button => button.innerText = "Submit")[0];
formSubmitButton.id = "form-submit-button";

const [title, author, isbn] = [document.getElementById("title"), document.getElementById("author"), document.getElementById("isbn")];

formSubmitButton.addEventListener("click", async function (e) {
    // maybe I should try and check if there is already an entry with the same title, author and isbn
    e.preventDefault();

    const [titleValue, authorValue, isbnValue] = [title.value, author.value, isbn.value];
    const newBook = {
        "title": titleValue.trim(),
        "author": authorValue.trim(),
        "isbn": isbnValue.trim()
    };
    if (titleValue.trim() === "" || authorValue.trim() === "" || isbnValue.trim() === "") return;

    fetch(`${baseUrl}.json`, {
            method: "POST",
            body: JSON.stringify(newBook)
        })
        .then(resp => resp.ok === true ? loadAllBooks() : console.log(`${resp.status} (${resp.statusText}) - The entry couldn't be posted on the server`));

    title.value = "";
    author.value = "";
    isbn.value = "";
});









/*
"rules": {
    ".read": "now < 1608933600000",  // 2020-12-26
    ".write": "now < 1608933600000",  // 2020-12-26
  }
*/
// {"author":"some author","title":"some book","isbn":"some isbn"}