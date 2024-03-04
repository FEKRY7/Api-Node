const express = require('express') 
const roter = express.Router()
const ProdectControl = require('./../Controler/ProdectControl.js')
const multerss = require('./../Maddewares/multer.js')

roter.route('/')
.get(ProdectControl.one)
.post(multerss.cpUpload,ProdectControl.three)

roter.route('/:RD')
.get(ProdectControl.tow)
.patch(ProdectControl.four)
.delete(ProdectControl.sexe)

module.exports = roter
