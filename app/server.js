const express = require('express');
const app = express();


const storeFileInDisk = require('./Middlewares/storeFileInDisk');
const extractLinesArrayFromFile = require('./Middlewares/extractLinesArrayFromFile');
const getJsonsFromLines = require('./Middlewares/getJsonsFromLines');
const extractStringFromFile = require('./Middlewares/extractStringFromFile');
const storeEnclosedFields = require('./Middlewares/storeEnclosedFields');

/*
La idea es la seguent:
    ·reps la file .csv com a form-data,
    hi accedeixes amb multer. No cal que la guardis, nomes que la llegeixis
    ·transformes el 
*/
app.post('/upload',[
    storeFileInDisk, 
    extractStringFromFile,
    storeEnclosedFields,
    // extractLinesArrayFromFile,
    getJsonsFromLines ],
    (req, res) => {

            
        console.log(`I'm in the controller`);
        res.status(200).send(req.parsedFile)
    
    
});

app.listen(3000,() => console.log(`Server escoltant al port 3000`))