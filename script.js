let defaultBooks = [
{
name:"The Alchemist",
author:"Paulo Coelho",
category:"Fiction",
image:"https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
description:"A journey about dreams and destiny."
},
{
name:"Atomic Habits",
author:"James Clear",
category:"Self Help",
image:"https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L.jpg",
description:"Build better habits."
}
];

let books = JSON.parse(localStorage.getItem("books")) || defaultBooks;

function saveBooks(){
localStorage.setItem("books",JSON.stringify(books));
}

/* LOGIN LOGOUT */
function logout(){
localStorage.removeItem("loggedIn");
window.location.href="login.html";
}

/* MENU */
function toggleMenu(){
document.getElementById("menu").classList.toggle("show");
}

/* NAVIGATION */
function showSection(id){
document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

/* DISPLAY */
function displayBooks(list=books){
let container=document.getElementById("bookContainer");
container.innerHTML="";

list.forEach((b,i)=>{
container.innerHTML+=`
<div class="card" onclick="showDetails(${i})">
<img src="${b.image}">
<h3>${b.name}</h3>
<p>${b.author}</p>
</div>`;
});
}

/* HOME */
function showHomeBooks(){
let home=document.getElementById("homeBooks");
home.innerHTML="";

books.forEach((b,i)=>{
home.innerHTML+=`
<div class="card" onclick="showDetails(${i})">
<img src="${b.image}">
<h4>${b.name}</h4>
</div>`;
});

totalBooks.innerText=books.length;
totalCategories.innerText=new Set(books.map(b=>b.category)).size;
}

/* ADD */
function addBook(){
let book={
name:bookName.value,
author:authorName.value,
category:category.value,
image:image.value||"https://via.placeholder.com/150",
description:description.value
};

books.push(book);
saveBooks();
alert("Book Added!");
showHomeBooks();
displayBooks();
}

/* SEARCH */
function searchBook(){
let val=search.value.toLowerCase();
let filtered=books.filter(b=>b.name.toLowerCase().includes(val));
displayBooks(filtered);
}

/* SUGGESTIONS */
search.addEventListener("input",function(){
let val=this.value.toLowerCase();
suggestions.innerHTML="";

books.forEach((b,i)=>{
if(b.name.toLowerCase().includes(val)){
suggestions.innerHTML+=`<div onclick="showDetails(${i})">${b.name}</div>`;
}
});
});

/* DETAILS */
function showDetails(i){
let b=books[i];
modal.style.display="block";

modalData.innerHTML=`
<h2>${b.name}</h2>
<img src="${b.image}" width="100%">
<p><b>Author:</b> ${b.author}</p>
<p><b>Category:</b> ${b.category}</p>
<p>${b.description}</p>
`;
}

function closeModal(){
modal.style.display="none";
}

displayBooks();
showHomeBooks();