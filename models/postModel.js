import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    text : {
        type : String,
    },
    image : {
        type : String
    },
    createdAt : {
        type: Date ,
        default : Date.now()
    },
    user :{
        type : mongoose.Schema.ObjectId,
        ref : "user"
    },
    likes : {
       type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
    },
    comments : {
        type : mongoose.Schema.ObjectId,
        ref : "comment"
    }
})


const postModel = mongoose.model("post", postSchema)
export default postModel