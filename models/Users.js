const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usernew = new Schema({
    username:String,
    email:String,
    password:String,
    type:String,
    resetToken:String 
})
const User = mongoose.model('user',Usernew)
module.exports=User
