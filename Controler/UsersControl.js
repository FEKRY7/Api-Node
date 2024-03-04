const User = require('./../models/Users.js')
const HTTP = require('./../folderS,F,E/S,F,E.JS')
const httperespons = require('./../utilites/httperespons.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const nodemailer = require('nodemailer')

const alluser = async (req, res) => {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            return httperespons.First(res, [], 200, HTTP.FAIL);
        } else {
            return httperespons.Second(res, users, 200, HTTP.SUCCESS);
        }
    } catch (error) {
        console.error('Error in alluser:', error);
        return httperespons.Third(res, [], 500, HTTP.ERROR);
    } finally {
        res.end();
    }
};


const register = async (req, res) => {
    try {
        const credUser = req.body;
        const err = validationResult(req)
        if(err.errors.length == 0){
            const repoItemail = await User.findOne({ email: credUser.email });

        if (repoItemail) {
            return httperespons.First(res, ['Email is already registered'], 200, HTTP.FAIL)
        }

        const hash = await bcrypt.hash(credUser.password, 5);
        const newUser = await User.create({
            username: credUser.username,
            email: credUser.email,
            password: hash,
            type: credUser.type
        });

          httperespons.Second(res, [newUser], 200, HTTP.SUCCESS)
        }else{
         httperespons.First(res, [err.errors], 200, HTTP.FAIL)
        }
        res.end()
    } catch (error) {
        console.error(error);
        httperespons.Third(res, ['Internal Server Error'], 200, HTTP.ERROR)
    }
};


const login = async (req, res) => {
    try {
        const credUser = req.body;
        const repoItemail = await User.findOne({ email: credUser.email });

        if (!repoItemail) {
         httperespons.First(res, ['Email is not registered'], 200, HTTP.FAIL)
        }

        const comparePassword = await bcrypt.compare(credUser.password, repoItemail.password);

        if (comparePassword) {
            const token = jwt.sign({
                username: repoItemail.username,
                email: repoItemail.email,
                type:repoItemail.type
            }, process.env.JWT_SECRET_KEY);

          httperespons.Second(res,['Login successful',{'token':token},{User:repoItemail.username}], 200, HTTP.SUCCESS)
        } else {
            httperespons.First(res,['Incorrect password'],200,HTTP.FAIL)
        }
    } catch (error) {
        console.error(error);
        httperespons.Third(res,['Internal Server Error'],404,HTTP.ERROR)
    }
};


const forgotpassword = async (req, res) => {
try{
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        httperespons.First(res,['No account of this user'],200,HTTP.FAIL)
    }

    // Generate a unique token for password reset
    const resetToken = Math.floor(Math.random() * 100000);
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'botrosjamal78@gmail.com',
            pass: 'fysgymskazyevdgw'
        }
    });

    var mailOptions = {
        from: 'botrosjamal78@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: 
        localhost:3000/api/users/reset-password/${resetToken}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    // Save the reset token in the user's document
    await User.updateOne({ email }, { $set: { resetToken } });
    httperespons.Second(res,['Email is sent'], 200, HTTP.SUCCESS)
}catch(error){
    console.error(error);
    httperespons.Third(res,['Internal Server Error'],404,HTTP.ERROR)
}
};



const resetpassword = async (req, res) => {
try{

    const token = req.params.token;
    const password = req.body.password;
    console.log(password);
    // find the user by the reset token
    const user = await User.findOne({ resetToken: token });

    if (!user) {
        httperespons.First(res,['Invalid or expired token'],200,HTTP.FAIL)
    }

    // Update the user's password and reset the resetToken
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ resetToken: token }, { $set: { password: hashedPassword, resetToken: Date.now() } });
    httperespons.Second(res,['Password has been reset successfully'], 200, HTTP.SUCCESS)
}catch(error){
    console.error(error);
    httperespons.Third(res,['Internal Server Error'],404,HTTP.ERROR)
}
};


module.exports={
    alluser,
    register,
    login,
    forgotpassword,
    resetpassword   
}