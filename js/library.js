const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
  book = new Book('Working Underpaid', 'Tyler Payne', '500', 'Yes');
  myLibrary.push(book);
  book2 = new Book('I am Ready to Retire', 'John Honnold', '345', 'No' );
  myLibrary.push(book2);
}

function displayLibrary() {

    var library = document.querySelector(".library-wrapper");

    myLibrary.forEach(book => {

       

        var newCarrd = document.createElement('div');

        newCarrd.classList.add('carrd');

        newCarrd.textContent = book.title;

        library.appendChild(newCarrd);


    })
}
addBookToLibrary();
displayLibrary();