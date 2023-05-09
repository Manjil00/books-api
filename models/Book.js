const mongoose = require("mongoose")
const user = require("./user")
const reviewSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
        minLength: 10
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
reviewSchema.set('toJSON',{
    transform:(document, returnedDocument) =>{
        returnedDocument.id = document._id.toString()
        delete returnedDocument._id
    }

})

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    author:{
        type:String,
        default:"Annonymous"
    },
    reviews:['reviewSchema0'] //embedded reviews in book.
},{timestamps: true})

bookSchema.set('toJSON',{
    transform: (document, returnedDocument) => {
        returnedDocument.id = document._id.toString()
        delete returnedDocument._id
        delete returnedDocument.__V
    }
})
module.exports = mongoose.model('Book', bookSchema)