const myLibrary = [];
const add_book_form = document.querySelector(".add_book_form");
const add_book_button = document.querySelector(".add_book");



add_book_button.addEventListener("click", () => {
    add_book_form.showModal();
});





document.querySelector("dialog form").addEventListener("submit", (e) => {
    e.preventDefault();

    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var pages = document.getElementById('pages').value;
    var read = document.querySelector('input[name="read?"]:checked').value;

    addBookToLibrary(title, author, pages, read);

    add_book_form.close();


})


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    changeReadStatus() {
        this.read == 'No' ? this.read = 'Yes' : this.read = 'No'; 
    }
}

function createElement(tag, className = '', content = '') {
    var element = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }

    if (content) {
        element.textContent = content;
    }

    element.textContent = content;
    return element;
}

async function createDeleteButton(url, svg_area, index = '') {

    const response = await fetch(url);
    const svgText = await response.text();


    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

    const svgElement = svgDoc.querySelector('svg');
    svg_area.append(svgElement);
 
    var trash_can_button = svg_area.querySelector('.delete');

    trash_can_button.dataset.index = index;

    trash_can_button.addEventListener('click', (e) => {
        myLibrary.splice(index, 1)
        clearLibrary();
        displayLibrary();

    })

}

async function createReadStatusButton(url, svg_area, book) {

    const response = await fetch(url);
    const svgText = await response.text();


    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

    const svgElement = svgDoc.querySelector('svg');
    svg_area.append(svgElement);

    var read_status_button = svg_area.querySelector('.read_status');

    read_status_button.addEventListener('click', () => {
        book.changeReadStatus();
        clearLibrary();
        displayLibrary();

    })
 

}







function addBookToLibrary(title, author, pages, read) {
    book = new Book(title, author, pages, read);
    console.table(book);
    myLibrary.push(book);
    clearLibrary();
    add_book_form.querySelector('form').reset();
    displayLibrary();
}

function displayLibrary() {

    var library = document.querySelector(".library-wrapper");

    myLibrary.forEach((book, index) => {

        var newCarrd = createElement('div', 'carrd');

        var title_heading = createElement('h4', 'headings', 'Title')
        var book_title = createElement('p', 'book_title', `${book.title}`);

        var author_heading = createElement('h4', 'headings', 'Author');
        var author_name = createElement('p', 'author_name', `${book.author}`);

        var pages_read = createElement('div', 'pages_read_area');

        var pages = createElement('div', 'pages');
        var pages_heading = createElement('h4', 'headings', 'Pages');
        var book_pages = createElement('p', 'book_pages', `${book.pages}`);
        pages.append(pages_heading, book_pages);

        var read = createElement('div', 'read');
        var read_heading = createElement('h4', 'headings', 'Read');
        var read_status = createElement('p', 'read_status', `${book.read}`);
        read.append(read_heading, read_status);

        pages_read.append(pages, read);

        var svg_area = createElement('div', 'svg-area');

        console.log(book, index);

        createReadStatusButton('./images/read.svg', svg_area, book);

        createDeleteButton('./images/trash.svg', svg_area, index);

       

        













        newCarrd.append(title_heading,
            book_title,
            author_heading,
            author_name,
            pages_read,
            svg_area
        );

        library.appendChild(newCarrd);


    })


}

const clearLibrary = () => {
    const carrds = document.querySelector('.library-wrapper').querySelectorAll('.carrd');
    carrds.forEach(carrd => {
        document.querySelector('.library-wrapper').removeChild(carrd);
    })

};

