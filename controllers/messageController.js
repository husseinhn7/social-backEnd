import messageModel from "../models/messageModel";
import { socketEmit, getSocket } from "../socket";
import { response } from "express";

export const createMessage = async (req, res) =>{
    const { body} = req
    const message  = await messageModel.create(body)
    const socketId = getSocket(message.receiver)
    if(socketId){
        socketEmit(socketId, "message", message)
    }
    response(res, 201, message)
}


export const getMessages = (req, res) =>{

}