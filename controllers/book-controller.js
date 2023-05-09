const Book = require('../models/book')
const getAllBooks = (req,res,next) =>{
    Book.find()
         .then(books => res.json(books))
         .catch(next)
}
const createBook= (req,res,next) => {
    book.create(req.body)
    .then(book => res.status(201).json(book))
    .catch(next)
}
const deleteAllBooks =((res, req,next) =>{
    Book.deleteMany()
    .then(reply => res.json(reply))
    .catch(next)
})
const getABook = ((req, res,next) =>{
    Book.findById(req.params.book_id) 
    .then((book => {
        if(!book) {

            res.status(404).json({error: 'book not found'})

        }
        res.json(book)
    }))
    .catch(next)
})
const updateABook =((req, res,next) =>{
    Book.findByIdAndUpdate(
        req.params.book_id,
        {$set: req.body},
        {new : true}
    ).then(updated => res.json(updated))
    .catch(next)


})
const deleteAbook = ((req, res,next) =>{
    Book.findByIdAndDelete(req.params,book_id)
    .then(reply => res.json(reply))
    .catch(next)
 })
 

 module.exports = {
    getAllBooks,
    createBook,
    deleteAllBooks,
    getABook,
    updateABook,
    deleteAbook,

 }