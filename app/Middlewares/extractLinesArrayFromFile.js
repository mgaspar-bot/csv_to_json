const readFileSync = require('fs').readFileSync;

function extractLinesArrayFromFile (req, res, next) {
    try {
        //get string with the whole file
        let path = req.file.path;
        let str = readFileSync(path);
        req.file["parsedFile"] = str.toString('utf-8');
        

        //Split string into linesArray
        req.file.parsedFile = req.file.parsedFile.split('\n');
        while (req.file.parsedFile[req.file.parsedFile.length-1] === "")
            req.file.parsedFile.pop(); //Neteja linies buides al final de la file

        next();
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            "msg":"something went wrong reading the already uploaded file"
        });
    }
    
}

module.exports = extractLinesArrayFromFile;