const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadedFiles');
    },
    filename: function (req, file, cb) {
        let storedFilename = `${Date.now()}-${file.originalname}`;
        cb(null, storedFilename);
    }
});
const fileFilter = function (req, file, cb) {
    try {
        if (file.mimetype === 'text/csv') {
            cb(null, true);
        } else {
            req.res.status(400).json({
                "msg":"only 'text/csv' mimetypes accepted"
            });
            return;
        }
        
    } catch (error) {
        console.log(error.message);
        req.res.status(500).json({
            "msg":"something went wrong checking the mimetype of the file"
        })
    }
    
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const uploadMiddleware = upload.single('csvfile')

module.exports = uploadMiddleware;