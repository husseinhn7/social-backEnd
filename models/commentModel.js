import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
    comment : {
        type : String,
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "user"
    },
    post  : {
        type : mongoose.Schema.ObjectId,
        ref : "post"

    },
    dateCreated : {
        type  : Date,
        default : Date.now()
    }
})



const commentModel = mongoose.model("comment", commentSchema)

export default commentModel