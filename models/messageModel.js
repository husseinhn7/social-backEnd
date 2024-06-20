import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    sender : {
        type : mongoose.Schema.ObjectId,
        ref  : "user"
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        ref  : "user"
    },
    text : String,
    dateCreated : {
        type :Date,
        default : Date.now()
    }
})




const messageModel =  mongoose.model("message", messageSchema)
messageSchema.index({ dateCreated: 1 });

export default  messageModel