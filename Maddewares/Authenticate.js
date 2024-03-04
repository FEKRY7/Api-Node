const jwt = require('jsonwebtoken')

const auth = (token)=>{
return  jwt.verify(token,process.env.JWT_SECRET_KEY)
}

module.exports = auth


