import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage});
// const upload = multer({storage}).single("image");

export default upload;      