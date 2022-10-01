import {Router} from "express"
import multer from "multer"
const router = Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/src/assets/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

  const upload = multer({ storage });

  router.post('/', upload.single("file"), function(req, res){
    try {
      const file = req.file 
      res.status(200).json(file.filename)
    } catch (error) {
      res.status(400).json({msg: "Impossible d'uploader le fichier"})
    }

  })

  export default router