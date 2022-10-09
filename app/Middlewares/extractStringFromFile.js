const readFileSync = require('fs').readFileSync;
const exec = require('child_process').exec;

function extractStringFromFile (req, res, next) {
    try {
        //get string with the whole file
        let path = req.file.path;
        let str = readFileSync(path);
        req.file["parsedFile"] = str.toString('utf-8');//No ho he provat amb altres encodings
                
        // if (req.body.store !== "true") //Esborra la file del meu disk a no ser que m'hagis demanat que no especificament
        exec(`rm -f ${req.file.path}`);

        next();
        
    } catch (error) {
        console.log(error.message);
        console.log();
        console.log(error.stack);
        res.status(500).json({
            "msg":"something went wrong reading the already uploaded file, or the file didnt upload"
        });
    }
    
}

module.exports = extractStringFromFile;