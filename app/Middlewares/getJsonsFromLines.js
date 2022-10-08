const generateDict = require('../utils/generateDict')


function getJsonsFromLines (req, res, next) {  
    let number_of_columns = req.file.parsedFile.split(',').length;
    
    let dict;
    if (req.body.no_header === "true") {
        dict = generateDict(number_of_columns);
    }else {
        dict = req.file.parsedFile[0];
    }

    let jsonArray = [];
    
    for (let i = 1; i < req.file.parsedFile.length; i++){
        let thisJson = {};
        thisJson[dict] = req.file.parsedFile[i];
        jsonArray.push(thisJson);
    }
    req.parsedFile = {
        "document": jsonArray
    }
    next();
}

function lineToJson(dict, line) {

}



module.exports = getJsonsFromLines;