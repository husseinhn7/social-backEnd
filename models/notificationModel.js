import mongoose from "mongoose";



const notificationSchema = mongoose.Schema({
    sender : {
        type : mongoose.Schema.ObjectId,
        ref  : "user"
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        ref  : "user"
    },
    action : String,
    dateCreated : {
        type :Date,
        default : Date.now()
    }
})


const notificationModel =  mongoose.model("notification", notificationSchema)

export default  notificationModel