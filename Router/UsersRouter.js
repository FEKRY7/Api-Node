const express = require('express') 
const users = express.Router()
const UsersControl = require('./../Controler/UsersControl.js')
const authenticate = require('./../Maddewares/UserMaddlwares.js')

users.route('/')
.get(UsersControl.alluser)

users.route('/register')
.post(authenticate.UserMaddlwares(),UsersControl.register)
 
users.route('/login')
.post(UsersControl.login)

users.route('/forgotpassword')
.post(UsersControl.forgotpassword)

users.route('/reset-password/:token')
.post(UsersControl.resetpassword)

module.exports=users