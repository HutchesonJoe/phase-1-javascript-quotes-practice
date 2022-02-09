document.addEventListener("DOMContentLoaded", function(){

let getQuotes = fetch('http://localhost:3000/quotes?_embed=likes',{

  method: 'GET',
  headers:
  {
    "Content-type" : "application/json"
  }
})
.then (response =>{return response.json()})
.then (function(data){
  makeList(data)
  console.log(data)
})

function makeList(data){
  let quoteList = document.getElementById("quote-list");
  for (let oneQuote of data){

    quoteId = oneQuote.id 
    qoute = oneQuote.quote
    quoteAuthor = oneQuote.author 
    likesArray = oneQuote.likes 
    likesCount = likesArray.length
    
    let quoteCard = document.createElement("li");
    quoteCard.className = "quote-card";
    quoteCard.id = quoteId
    let quoteBlock = document.createElement("blockquote");
    quoteBlock.className = "blockquote";
    let quoteP = document.createElement("p");
    quoteP.className = "mb-0";
    quoteP.textContent = qoute
    let footer = document.createElement("footer");
    footer.className = "blockquote-footer"
    footer.textContent = quoteAuthor
    let breakBr = document.createElement("br");
    let likesButton = document.createElement("button");
    likesButton.addEventListener("click", handleLikes)
    likesButton.className = "btn-success";
    likesButton.textContent = "Likes: " + likesCount
    likesButton.addEventListener("click", () => likesCount+=1)
  
    let deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", handleDelete)
    deleteButton.className = "btn-danger";
    deleteButton.textContent = "Delete"

    quoteList.append(quoteCard);
    quoteCard.append(quoteBlock);
    quoteBlock.append(quoteP);
    quoteBlock.append(footer);
    quoteBlock.append(breakBr)
    quoteBlock.append(likesButton);
    quoteBlock.append(deleteButton)



  }
}
 let form = document.getElementById("new-quote-form")
 form.addEventListener('submit', handleSubmit)

 function handleSubmit(e){
   e.preventDefault();
   let newQuote = e.target.quote.value;
   let newAuthor = e.target.author.value;
   fetch('http://localhost:3000/quotes?_embed=likes', {
    method: 'POST',
    headers:
    {
      "Content-type" : "application/json"
    },
    body:JSON.stringify({
      "quote" : newQuote,
      "author" : newAuthor
    })
  })
  .then (response =>{return response.json()})
  .then (function(data){
    let quoteList = document.getElementById("quote-list")
   
    let quoteCard = document.createElement("li");
    quoteCard.className = "quote-card";
    quoteList.append(quoteCard)

    quoteCard.id = data.id
   
    let quoteBlock = document.createElement("blockquote");
    quoteBlock.className = "blockquote";
    let quoteP = document.createElement("p");
    quoteP.className = "mb-0";
    quoteP.textContent = newQuote
    let footer = document.createElement("footer");
    footer.className = "blockquote-footer"
    footer.textContent = newAuthor
    let breakBr = document.createElement("br");
    let likesButton = document.createElement("button");
    likesButton.className = "btn-success";
    likesButton.textContent = "Likes: " + likesCount
    likesButton.addEventListener("click", handleLikes)
    likesButton.addEventListener("click", () => likesCount++)
    let deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", handleDelete)
    deleteButton.className = "btn-danger";
    deleteButton.textContent = "Delete";
    quoteCard.append(quoteBlock);
    quoteBlock.append(quoteP);
    quoteBlock.append(footer);
    quoteBlock.append(breakBr)
    quoteBlock.append(likesButton);
    quoteBlock.append(deleteButton)
   
  })

 }
 
 function handleDelete(e){
   let deleteElement = e.target.parentElement
   let quoteCard = deleteElement.parentElement
  quoteCard.remove()

   fetch(`http://localhost:3000/quotes/${quoteCard.id}`, {
    method: 'DELETE',
    headers:
    {
      "Content-type" : "application/json"
    }
  })
  .then (response =>{return response.json()})
  // .then (function(data){
  //   console.log(data)
  // })

 }

function handleLikes(e){
let likedElement = e.target.parentElement
let quoteCard = likedElement.parentElement
let likeButton = quoteCard.getElementsByClassName("btn-success");
console.log(likeButton)
let quoteCardId = parseInt(quoteCard.id)
//reload(likedElement)
//likeButton.id = quoteCardId
// let likeButtonText = likeButton[0].textContent.split(" ")
// let likeButtonTextInt = parseInt(likeButtonText[1])
// likeButtonTextInt++
// likeButton.textContent = ""
// likeButton.textContent = "Likes: " + likeButtonTextInt

   fetch(`http://localhost:3000/likes`, {
    method: 'POST',
    headers:
    {
      "Content-type" : "application/json"
    },
    body:JSON.stringify(
      {
        "quoteId" : quoteCardId
      }
    )
  })
  .then (response =>{return response.json()})
  .then (function(data){
    likesArray = data;
    console.log(likesArray)
  })
}










 
  








// code above this line
})