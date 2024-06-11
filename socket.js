import { socketServer } from "./server.js"


export const socketsList = new Map()


export const addSocket = (key, value) =>{
    socketsList.set(key, value)
}

export const getSocket = (key) =>{
    return socketsList.get(key)
}

export const socketEmit = (socketId, ev, data) =>{
    socketServer.to(socketId).emit(ev, data)
}