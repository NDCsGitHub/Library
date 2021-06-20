const form = document.querySelector(".formContainer")
const addNewBook = document.querySelector(".addNewBook")
const overLay = document.querySelector('#overLay')
const closeForm = document.querySelector('.closeForm');

const titleInput = form.querySelector('.formTitle')
const authorInput = form.querySelector('.formAuthor')
const pagesInput = form.querySelector('.formPages')
const dateInput = form.querySelector('.formDate')
const readInput1 = form.querySelector('#option-1')
const readInput2 = form.querySelector('#option-2')
const submit = document.querySelector(".submit");

const cardContainer = document.querySelector('.cardContainer')

const totalCards = document.querySelector(".totalBook")



//all of book objects are going to be stored in this array
let myLibrary=[
    {
        title:"MyFirstBook",
        author:"NDC",
        pages:"125",
        date:"2021-05-25",
        read: "Yes",
    },
];

//constructor
class Book {
    constructor(title, author, pages, date, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.date = date;
        this.read = read;
    }
}




// functionality for add new book button, and closing form.
addNewBook.addEventListener("click",()=>{
    openForm();
 })
 
 closeForm.addEventListener('click',()=>{
     closeFormFunction()
 });
 
 function openForm(){
     closeForm.classList.add("closeForm")
     closeForm.innerHTML="&times;"
     titleInput.value=""
     authorInput.value=""
     pagesInput.value=""
     dateInput.value=''
     submit.textContent="Add"
     form.classList.add("active")
     overLay.classList.add("active")
   
 }
 
 function closeFormFunction(){
     form.classList.remove("active")
     overLay.classList.remove("active")
 }
 


//functionality that will add new book to myLibrary array
submit.addEventListener('click',(e)=>{
    e.preventDefault()
    addBookToLibrary()
    form.reset()
    closeFormFunction()
    totalCardCount()
});
function addBookToLibrary(){
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let date = dateInput.value;
    let read = readValue()

    let newBook = new Book(title, author, pages, date, read);
    myLibrary.unshift(newBook);
    displayArray()
}
function readValue(){
    if(readInput1.checked) {
        return "Yes";
    }
    else {
        return "No";
    }
}



//reset the carContainer to remove all cards, this is needed to prevent displayArray() function making duplicates
function resetGrid() {
    cardContainer.innerHTML = "";
  }

//function to loop through the array and displays each book on the page
function displayArray(){
    resetGrid()
    myLibrary.forEach(eachBook=>{

        const cardContainer = document.getElementById('cardContainer');
        const cards = document.createElement('div');
        const title = document.createElement("div");
        const author = document.createElement("div");
        const pages = document.createElement("div");
        const date = document.createElement("div");
        const read=document.createElement('div');
        const cardButtons = document.createElement('div');
        const editCard = document.createElement('button');
        const removeCard = document.createElement('button');

        cards.classList.add('cards');
        title.classList.add('cardDetailTitle');
        author.classList.add('cardDetailAuthor');
        pages.classList.add('cardDetailPages');
        date.classList.add('cardDetailDate');
        read.classList.add('cardDetailRead');
        cardButtons.classList.add('cardButtons')
        editCard.classList.add('editCard')
        removeCard.classList.add('removeCard')

        cardContainer.appendChild(cards)
        cards.appendChild(title)
        cards.appendChild(author)
        cards.appendChild(pages)
        cards.appendChild(date)
        cards.appendChild(read)
        cards.appendChild(cardButtons)
        cardButtons.appendChild(editCard)
        cardButtons.appendChild(removeCard)

        title.textContent = `Title: ${eachBook.title}`
        author.textContent = `Author: ${eachBook.author}`
        pages.textContent = `Pages: ${eachBook.pages}`
        date.textContent = `Date: ${eachBook.date}`
        read.textContent = `Completed: ${eachBook.read}`
        editCard.textContent = "Edit"
        removeCard.textContent="Remove"

       
        removeCard.addEventListener('click',()=>{
            cardContainer.removeChild(cards)
            removeFromLibrary(`${eachBook.title}`)
        })
    
        editCard.addEventListener('click', ()=>{
            editLibraryCard(`${eachBook.title}`,`${eachBook.author}`,`${eachBook.pages}`,`${eachBook.date}`,cards)
        })


    })
}
displayArray()



//function that will remove books from the array.
function removeFromLibrary(bookTitle) {
    myLibrary = myLibrary.filter((book) => book.title !== bookTitle);
    totalCardCount()
}



//function that will allow user to edit the book card
function editLibraryCard(title, author, pages, date, cards){
    openForm()
    submit.textContent="Save Edit"
    titleInput.value = title
    authorInput.value = author
    pagesInput.value = pages
    dateInput.value = date
    closeForm.textContent=""
    closeForm.classList.remove("closeForm")
    cardContainer.removeChild(cards)
    removeFromLibrary(title)
}
    


//function for updating the total number of cards
function totalCardCount(){
    totalCards.innerHTML = `Total: ${myLibrary.length}`
}
totalCardCount()






