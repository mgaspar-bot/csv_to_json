const checkDQuotes = require("../utils/checkDQuotes");

function storeEnclosedFields (req,res,next){
    try {
        req.file.parsedFile = req.file.parsedFile.trim();
        // req.file.parsedFile = req.file.parsedFile.replace(/\r/g, '');

        req.body["storedEnclosedFields"] = [];
        while (req.file.parsedFile.includes('"')){ //Mentre hi hagi dobles comillas a la string fes:
            //Troba un camp tancat per comillas
            // console.log(`Una volta del while`);
            let startFinish = checkDQuotes(req.file.parsedFile); 
            // console.log(req.file.parsedFile);
            
            //Esborra de la string el camp tancat per comillas i substituex-lo per una string reconeixible per despres
            let start = startFinish[0]; let finish = startFinish[1];
            let enclosedField = req.file.parsedFile.split('').splice(start, (finish - start)+1, `_storedEnclosedField#${req.body.storedEnclosedFields.length}`).join('');
            // console.log(enclosedField);
            req.file.parsedFile = req.file.parsedFile.replace(enclosedField, `_storedEnclosedField#${req.body.storedEnclosedFields.length}`)
            
            enclosedField = enclosedField.replace(/""/g,'"');
            
            //Guardat el camp tancat per comillas en una array del body, despres els tornarem a enganxar
            req.body.storedEnclosedFields.push(enclosedField);

            
        }
        next();
        /*
        Ara hem tret tots els camps envoltats de " aixi que totes les '\n' i ',' que trobem
        signifiquen el que volem que signifiquin, podem començar a convertir la string en 
        una array de jsons fent .split('\n') i .split(',')
        */
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            "msg":".csv file has messed up double quotes"
        })
        return;
        /*
        checkDQuotes llença un error si falla, aixi que el manejem aqui
        */
    }
}



module.exports = storeEnclosedFields