require('dotenv').config()
const express = require('express')

const mongoose = require('mongoose')
const books_routes = require('./routes/books-routes')
const user_routes=require('./routes/user-routes')
const port = process.env.PORT
mongoose.connect('mongodb://127.0.0.1:27017/Books-Review')


 .then(()=>{31333333333

console.log('connected to the mongodb database server')

})

.catch((err) => console.log(err))

const app = express() //initiate  express by giving name app
app.use(express.json()) //request pass through this

app.get('/', (req,res) =>{

//  console.log(req)

 res.send("babayaga")

})

app.use('/books', books_routes )

//Error handling middleware
app.use((err, req ,res ,next)=> {
    console.error(err)
    if (err.name==='ValidationError')res.status(400)
    else if (err.name==='CastError')res.status(400)
    console.log(err.message)
    res.json({error:err.message}) 
    
})


app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})
