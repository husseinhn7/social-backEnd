import { promisify } from "util"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import { response } from "../util/controllersUtil.js"




export const authOnly = async (req, res, next) =>{
    const headers = await req.headers
     const { authorization } = headers
     

  

    if(!authorization) return response(res, 403, {msg: "unauthorized"} )
        const token = authorization.split(' ')[1]
    
    const decodedJwt = await promisify(jwt.verify)(token, process.env.JWT_SEC)
    const user = await userModel.findById( decodedJwt.id )

    if(!user) return response(res, 403, {msg: "unauthorized"})
    
    if(!(await user.passwordChangedAfter(decodedJwt.iat))) {
       
        return response(res, 403, {msg: "unauthorized token exp"}) 
    }
    req.user = user
    next()
}