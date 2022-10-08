const readFileSync = require('fs').readFileSync;
const exec = require('child_process').exec;

const checkDQuotes = require('../utils/checkDQuotes')

function extractLinesArrayFromFile (req, res, next) {
    try {
        //get string with the whole file
        let path = req.file.path;
        let str = readFileSync(path);
        req.file["parsedFile"] = str.toString('utf-8');
                
        // req.file.parsedFile = req.file.parsedFile.trim(); //Esborra espais buits al principi i final de l'arxiu
        try {
            let enclosedFieldStartAndEnd = checkDQuotes(req.file.parsedFile);
            let start = enclosedFieldStartAndEnd[0]; let end = enclosedFieldStartAndEnd[1];
            let copiedField = req.file.parsedFile.splice(start,(end - start)+1, `_stored_field#${i}`);
            req.body.copiedFields.push
        } catch (error) {
            console.log(error.message);
            return;
        }
        

        if (req.body.store !== "true") //Esborra la file del meu disk a no ser que m'hagis demanat que no especificament
            exec(`rm -f ${req.file.path}`);

        //Split string into linesArray
        req.file.parsedFile = req.file.parsedFile.split('\n');
        
        // while (req.file.parsedFile[req.file.parsedFile.length-1] === "")
        //     req.file.parsedFile.pop(); //Neteja linies buides al final de la file
        next();
        
    } catch (error) {
        console.log(error.message);
        console.log();
        console.log(error.stack);
        res.status(500).json({
            "msg":"something went wrong reading the already uploaded file"
        });
    }
    
}

module.exports = extractLinesArrayFromFile;