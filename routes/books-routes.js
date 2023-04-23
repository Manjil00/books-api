const express = require('express')
const Book=require('../models/Book')

let books = require('../data/books')

const router = express.Router()

router.route('/')
.get(async(req,res)=>{
    // Book.find()r
    //     .then(books=>res.json(books))
    //     .catch(err=>console.log(arr))
    try{
        const books=await Book.find()
    }
    catch(error){
       console.log(err)
    }
})

.get((req, res) =>{
res.json(books)
})
.post((req,res)=>{
if(!req.body.title){// provide error message
return res.status(400).json({error: "title is missing"})
}

const book = {
    id : books.length+1, //add a book with title and author name to the previous list of book
    title: req.body.title,
    author: req.body.author || 'Anonymous'

}

books.push(book)
res.status(201).json(book)
})

.put((req,res) =>{
res.status(405).json({error: "PUT request is not allowed"})

})
.delete((res, req) =>{
res.json({})
})

router.route('/:book_id')
.get((req, res) =>{
const book_id = Number(req.params.book_id)
const book= books.find((b) =>b.id ===book_id)
res.json(book)
})

.post((req, res) =>{
res.status(405).json({error: "POST request is not allowed"})

})

.put((req, res) =>{
const updated_books = books.map((b)=>{
if(b.id == req.params.book_id){
b.title = req.body.title
b.author = req.body.author
return b

}

})




res.json(updated_books)

})




.delete((req, res) =>{

const updated_books = books.filter((b) => {

if (b.id !=req.params.book_id) return b

})

res.json(updated_books)

})




module.exports = router