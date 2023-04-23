require('dotenv').config()
const express = require('express')

const mongoose = require('mongoose')
const books_routes = require('./routes/books-routes')
const port = process.env.PORT
mongoose.connect('mongodb://127.0.0.1:27017/Books-Review')

 .then(()=>{

console.log('connected to the mongodb database server')

})

.catch((err) => console.log(err))

const app = express() //initiate  express by giving name app
app.use(express.json()) //request pass through this

app.get('/', (req,res) =>{

//  console.log(req)

 res.send("chaprii")

})

app.use('/books', books_routes )
app.listen(port,()=>{

console.log(`server is running at port ${port}`)

})

