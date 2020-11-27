const tableBooks = document.querySelectorAll("table")[0];
tableBooks.id = "books-table";
const tableBody = tableBooks.querySelector("tbody");
// load all books
async function loadAllBooks(e) {
    const response = await fetch(`https://books-db1.firebaseio.com/books/.json`);
    if (response.ok === false) return;

    const books = await response.json();
    const firstBookObj = books[Object.keys(books)[0]];

    // I should check if the element with this key is already there

    const rowFirstBook = document.createElement("tr");
    const htmlFirstBookRow = `<td>Harry Poter</td><td>J. K. Rowling</td><td>0-7475-3269-9</td><td><button>Edit</button><button>Delete</button></td>`;
    rowFirstBook.innerHTML = htmlFirstBookRow;
    tableBody.appendChild(rowFirstBook);
    //Object.keys(books).forEach(key => {    });
}
document.getElementById("loadBooks").addEventListener("click", loadAllBooks);
// get the 'Submit' button of the form
const formSubmitButton = [...document.querySelectorAll(`form button`)].filter(button => button.innerText = "Submit")[0];
formSubmitButton.id = "form-submit-button";

const [title, author, isbn] = [document.getElementById("title"), document.getElementById("author"), document.getElementById("isbn")];

formSubmitButton.addEventListener("click", async function (e) {
    e.preventDefault();

    const [titleValue, authorValue, isbnValue] = [title.value, author.value, isbn.value];
    const newBook = {
        "title": titleValue,
        "author": authorValue,
        "isbn": isbnValue
    };
    if (titleValue.trim() === "" || authorValue.trim() === "" || isbnValue.trim() === "") return;

    fetch(`https://books-db1.firebaseio.com/books/.json`, {
            method: "POST",
            body: JSON.stringify(newBook)
        })
        .then(resp => resp.json())
        .then(r => console.log(r));

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