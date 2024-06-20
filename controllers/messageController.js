import messageModel from "../models/messageModel.js";
import { socketEmit, getSocket } from "../socket.js";
import { response } from "../util/controllersUtil.js";

export const createMessage = async (req, res) =>{
    const { body} = req
    const message  = await messageModel.create(body)
    console.log("++++++++++++++++++++++")
    console.log(message)

    const socketId = getSocket(body.receiver)
    if(socketId){
        console.log("+++++++000000++++++++++")
        socketEmit(socketId, "message", message)
    }
    response(res, 201, message)
}

export const getMessages = async  (req, res) =>{
    const {user, params} = req
    const chat = await messageModel.find({
        $or: [
          { sender: user._id, receiver: params.id },
          { sender: params.id, receiver: user._id }
        ]
      })
    .sort({dateCreated : -1})
     response(res, 200, chat)
}