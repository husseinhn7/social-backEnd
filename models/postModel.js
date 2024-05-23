import mongoose from "mongoose";
import user from "./userModel";






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
        type : mongoose.Schema.ObjectId
    },
    likes : {
       type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    comments : {
        type : mongoose.Schema.ObjectId
    }
})