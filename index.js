const express = require('express')
let books= require('./data/books')//importing books.js
const app = express()//instance of express
const books_routes=require('./routes/book-routes')
const port =process.env.PORT

app.use(express.json())

//get
app.get('/',(req, res)=>{     //get is generally used request  '/' is path
    
        console.log(req),
        res.send("Hello World")
    
}) 
app.get('/api/books',(req, res)=>{
    res.json(books)   //convert to string
})
//post
app.post('/api/books',(req, res)=>{
    if(!req.body.title){
        return res.status(400).json({error:'title is missing'})
    }
    const book ={
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author || 'Anonymous'
    }
    books.push(book)
    res.status(201).json(book) //to send status code post req success
})
//put
app.put('/api/books/:book_id', (req, res) => {
    if(!req.body.author){
        return res.status(400).json({error:'author is missing'})
    }
    const updated_books= books.map((b) =>{
        if (b.id == req.params.book_id){
            b.title = req.body.title,
            b.author = req.body.author
        }
        return b
    }) //in map you can use double ==
    res.json(updated_books)

})
//delete
app.delete('/api/books/:book_id',(req,res) =>{
    const updated_books= books.filter((b)=>{
        if (b.id != req.params.book_id)
            return b
        
    })
    res.json(updated_books)
    
})
//to get one particular book : pass id in path
app.get('/api/books/:book_id',(req, res)=>{
    const book_id = Number(req.params.book_id)
    const book= books.find((b) => b.id ===book_id)
    res.json(book)

})

// app.use('/api/books'books_routes)

app.listen(3000, ()=>{
    console.log('Server is running at port 3000')
})

