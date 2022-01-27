const {Router} = require('express')
const GroupeController = require('../controllers/groupe.controller')
const multer  = require('multer')
const path = require('path')
// const upload = multer({ dest: path.resolve(__dirname, '../public/images')})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '../public/images'))
    },
    filename: (req, file, cb) =>{
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now() + '-' +file.originalname )
    }
  })
  
  const upload = multer({ storage })

const groupeUser = Router()

groupeUser.post('/', GroupeController.postOneGroupe)
groupeUser.get('/:userId', GroupeController.getGrouresByUser)
groupeUser.post('/:groupeId/image', upload.single('image'), GroupeController.createImageForGroupe)

module.exports = groupeUser