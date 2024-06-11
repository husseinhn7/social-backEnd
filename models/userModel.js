import mongoose  from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"
import crypto from "crypto"


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
    followers : [{
        type : mongoose.Schema.ObjectId,
        ref : "user"
    }],
    following : [{
        type : mongoose.Schema.ObjectId,
        ref : "user"
    }],
    personalImage : {
        type : String,
        default : "/images/blank.webp"
    },
    
    emailConfirmed :{
        type : Boolean,
        default : false
    },
    passwordChangedAt : Date,
    passwordRestToken : String,
    PasswordRestExpires : Date,
    socketID : String
  },

)

userSChema.pre("save", async function( next ){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12)
     this.confirmPassword = undefined

    next()
})


userSChema.methods.correctPassword = async function (postedPassword , password ){
    return await bcrypt.compare(postedPassword, password)
}

userSChema.methods.passwordRestTokenFn =  function() {
    const restToken = crypto.randomBytes(32).toString("hex")
    this.passwordRestToken = crypto.createHash("sha256").update(restToken).digest("hex")
    this.PasswordRestExpires = Date.now() + 10 * 60 * 1000
    return restToken
}

userSChema.pre("save" , async function( next ) {
    if(!this.isModified("password") || this.isNew ) return next();

    this.passwordChangedAt = Date.now() - 2000 ;
     next()
})

userSChema.methods.passwordChangedAfter = async function(JWTDate){
    if (this.passwordChangedAt){
        const date = parseInt(this.passwordChangedAt.getTime() / 1000, 10 )
     

        return date < JWTDate
    }
    return false
}


const userModel = mongoose.model("user" , userSChema)


export default userModel;