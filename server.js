import   mongoose  from "mongoose";
import   app from "./app.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { networkInterfaces } from "os";
import { addSocket, getSocket, socketEmit } from "./socket.js";


const localDB = process.env.DB_LOCAL

export const expressServer = createServer(app)

const HOST = networkInterfaces()['Wi-Fi'][1].address



const mongooseConnection = async () =>{
    const dbConnection = await mongoose.connect(localDB)
    const conStatus    = await dbConnection.connection
    if(conStatus){
        const server = expressServer.listen(5000,HOST,()=>{
            console.log(`app is listening http://${HOST}:5000`)

        })

        return server
       
    }
}
 

export const socketServer = new Server( expressServer, {
    cors :{ origin :["http://localhost:3000", `http://${HOST}:3000`]}
})


// const sockets = new Map() 

socketServer.on("connection",   (socket) =>{
    console.log("===================")
    console.log(socket.id)
    socket.on("setSocketId",   (userId) =>{
        addSocket(userId, socket.id)
      })
    // socket.on("message", async (soc)=>{
    // const messageBody = {
    //     sender : soc.senderId ,
    //     receiver : soc.receiverId  ,
    //     text : soc.message
    // }
    //     const m = await messageModel.create(messageBody)
    //     const receiver = getSocket(soc.receiverId)
    //     socketEmit(receiver, "p", soc)
    //     socketServer.to(receiver).emit("p", soc )
    //  })
    //  socket.on("notification", async (soc)=>{
    //     const notificationBody = {
    //         sender : soc.senderId ,
    //         receiver : soc.receiverId  ,
    //         text : soc.action
    //     }
    //     const m = await notificationModel.create(notificationBody)
    //     const receiver = sockets.get(soc.receiverId)
    //     socketServer.to(receiver).emit("sendNotification", soc )
    //  })
})
mongooseConnection()