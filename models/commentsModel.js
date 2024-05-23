import mongoose from "mongoose";



const commentsSchema = mongoose.Schema({
    comment : {
        type : String,
    },
    user : {
        type : mongoose.Schema.ObjectId
    },
    post  : {
        type : mongoose.Schema.ObjectId
    },
    dateCreated : {
        type  : mongoose.Schema.ObjectId
    }

})