const multer = require('multer')

const ok = multer.diskStorage({
destination: function (req, file, cb){
      cb(null, 'uploads')
},
filename: function (req, file, cb){
      const DS = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const KG = file.mimetype.split('/')[1]
      const filenames = DS + '.' + KG
      cb(null,filenames)
    }
})
  
const upload = multer({ storage: ok },function fileFilter (req, file, cb) {
    const stand = file.mimetype.split('/')[0] 
    if(stand !== 'image'){
    cb(null, false)
    }else{
    cb(null, true)
    }
  })

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 },{ name: 'gallery', maxCount: 4 }])

module.exports={
    cpUpload
}