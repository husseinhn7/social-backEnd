import mongoose  from "mongoose";
import app from "./app.js";


const localDB = process.env.DB_LOCAL

mongoose.connect(localDB ).then((con)=>{
    if(con){
        app.listen(4000, ()=>{
            console.log("app is listening  ")
        })
    }
})
.catch((err)=>console.log(err))

