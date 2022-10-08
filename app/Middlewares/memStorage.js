/*
configura multer per guardar la file en un buffer
(despres hi podras accedir amb req.file.buffer)

exporta el middleware (per una sola file);
*/

const multer = require('multer');

const storage = multer.memoryStorage();
const fileFilter = function (req, file, cb) {
    try {
        if (file.mimetype === 'text/csv') {
            cb(null, true);
        } else {
            // cb(null, false); //Simplement no escriu res a req.file, aixi que despres no s'hi pot accedir; per això dona error
                                //Molt util si vulgues acceptar varies files pq em pillaria les bones nomes, pero com que nomes vull
                                //acceptar una file, en tinc prou amb que m'avisi i pari l'execucio
            req.res.status(403).json({
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
    limits:{
        fileSize:134200000
    },
    fileFilter:fileFilter
}); 
const uploadMiddleware = upload.single('csvfile');

module.exports = uploadMiddleware;

/*
Segons els docus de node el maxim que pot contenir
un Buffer es 1gb en ordinadors de 32 bits i 2gb en
els de 64bits

Poso 1gb de maxim per si on cas 
(un csv de 1gb ha de ser totxissim)
*/