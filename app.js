//book class
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn =isbn;
    }
}

class store{
    static getBooks(){
        let books;
        if (localStorage.getItem('books')=== null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){

        const books = store.getBooks();
        books.push(book);
        
        localStorage.setItem('books',JSON.stringify(books));
        
    }
        static removeBook(isbn){
        const books = store.getBooks();

        books.forEach((book,index)=>{
            if (book.isbn === isbn){
                books.splice(index,1)
            }
        });

        localStorage.setItem('books',JSON.stringify(books))    
               
            
        }

    
}

//UI class
class UI {
    static displaybooks(){
        
        const books = store.getBooks();

        books.forEach((book)=>UI.addBookToList(book));

    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-small danger delete">X<a/></td>
        `;
        list.appendChild(row)
        
    }

    static deleteBook(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            UI.showAlearts('Book removed','info')
            
        }

    }

    static showAlearts(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        //vanish in 3 seconds
        setTimeout(()=> document.querySelector('.alert').remove(),2000)

    }

    static clearField(){
        document.querySelector('#title').value = ""
        document.querySelector('#author').value = ""
        document.querySelector('#isbn').value = ""

    }
    
}

//Store class stores in local memory

//Events show books
document.addEventListener('DOMContentLoaded',UI.displaybooks)

//Event add book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    // get form values
    e.preventDefault()
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

// validate all input fields are filled in.

if (title === "" || author === "" || isbn === ""){
    UI.showAlearts('Please fill all input fields','danger')
    }else{


    // start new book class

    const book = new Book (title, author, isbn);
    
    // add to UI

    UI.addBookToList(book)

    //clear fields
    UI.clearField()

    UI.showAlearts('Your book was added successfully','success')

    store.addBook(book)

    }
});

//remove book
document.addEventListener('click',(e)=>{
    UI.deleteBook(e.target)
    store.removeBook(e.target.parentElement.previousElementSibling.textContent)
})
