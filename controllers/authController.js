import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import { response } from "../util/controllersUtil.js"
import crypto from "crypto"
import { token } from "morgan"






const loginToken = (user) =>{
    return jwt.sign({id: user._id} , process.env.JWT_SEC , {
        expiresIn : process.env.JWT_EXP
    })
}


export const register = async (req, res) => {
    const data = await req.body
    const newUser = await userModel.create(data)
    const token = loginToken(newUser)
    response(res, 201, {token : token , user : newUser})
}


export const  login = async (req, res) =>{
    const { email , password } = await req.body
    if (!email || !password) return response(res,403, {msg : "we require both email and password"})
    
    const User = await userModel.findOne({email : email }).select("+password")
    console.log(User)

    if(!User || !(await User.correctPassword(password, User.password))) return response(res, 404, {msg : "incorrect email or password"})

    const token = loginToken(User)
    
    User.password = undefined
    response(res, 200, {
        user : User,
        token : token 
    }) 
}




export const forgetPassword = async (req, res) =>{
    const  { email } = await req.body
    const User = await userModel.findOne({ email })
    if (!User) return response(res, 404 , {msg : "user not found"})
     
    const restToken = User.passwordRestTokenFn()
    await User.save({validateBeforeSave : false})
    response(res, 200, {restToken : restToken})

} 




export const restPassword = async (req, res) =>{
    const hashedToken = crypto.createHash("sha256").update(req.body.token).digest("hex")
    const User = await userModel.findOne({passwordRestToken : hashedToken ,PasswordRestExpires : {$gt : Date.now()} })
    if(!User) return response(res, 404, {msg: "resetToken is invalid or has been expired"})
    const {password, confirmPassword} = req.body
    User.password = password
    User.passwordRestToken = undefined
    User.PasswordRestExpires = undefined
    console.log(User)
    await User.save({validateBeforeSave : false})
    const token = loginToken(User)
    response(res, 200, {user: User, token: token })
    
}


export const t = (req, res) =>{
    res.json({msg : "it works"})
}