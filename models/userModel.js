import mongoose  from "mongoose";
import validator from "validator"





const userSChema = mongoose.Schema({
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    email : {
        required : [true , "the email is required "],
        type : String,
        unique: true,
        validate : [validator.isEmail , "enter a valid email"]
    },
    password : {
        type : String,
        required : [true , "the password is required "],
        select : false
    },
    confirmPassword : {
        type : String,
        required : [true , "the password is required "],
        validator : function (ele){
            return ele === this.password
        }
    },
    joiningDate : {
        type: Date,
        default : Date.now()
    },

    birthDate : {
        type : Date
    },
    followers : {
        type : mongoose.Schema.ObjectId
    },
    personalImage : {
        type : URL
    },
    coverImage : {
        type : URL
    },
    emailConfirmed :{
        type : Boolean,
        default : false
    },
    passwordChangedAt : Date,
    passwordRestToken : String,
    PasswordRestExpires : Date
  },

)



const user = mongoose.model("user" , userSChema)


export default user;