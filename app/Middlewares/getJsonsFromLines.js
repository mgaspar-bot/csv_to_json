const generateDict = require('../utils/generateDict')
const lineToJson = require('../utils/lineToJson')


function getJsonsFromLines (req, res, next) {  
    req.file.parsedFile = req.file.parsedFile.split('\n')
    
    let i = 1; //es lleig pero declaro aqui el index del bucle per poder assignar-li valors abans del bucle
    
    //Extraiem el nom i quantitat de columnes de la primera fila
    let dict = req.file.parsedFile[0].split(',');
    
    if (req.body.no_header === "true") {
        dict = generateDict(dict.length); //si ens has especificat que la primera linia no es el nom de les columnes, omplo dict de noms generics
        i = 0; //el bucle comença una fila més amunt
    }

    let jsonArray = [];
    
    for ( i; i < req.file.parsedFile.length; i++){
        //Extract json from line
        let thisJson = lineToJson(dict, req.file.parsedFile[i], req.body.storedEnclosedFields); //Molt guarro pero de una li paso req a lineToJson pq pugui fer les substitucions
        
        //check for correct number of columns
        if (thisJson === -1) {
            res.status(400).json({
                "msg":"one of the .csv lines has an incorrect number of columns"              
            })
            return;
        }
        //if totOk, push json into response array
        jsonArray.push(thisJson);
    }
    //turn array into a json containing the array
    req.parsedFile = {
        "document": jsonArray
    }
    next();
}

module.exports = getJsonsFromLines;