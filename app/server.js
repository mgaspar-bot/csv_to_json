const express = require('express');
const app = express();
const exec = require('child_process').exec;


const storeFileInDisk = require('./Middlewares/storeFileInDisk');
const extractLinesArrayFromFile = require('./Middlewares/extractLinesArrayFromFile');
const getJsonsFromLines = require('./Middlewares/getJsonsFromLines')

/*
La idea es la seguent:
    ·reps la file .csv com a form-data,
    hi accedeixes amb multer. No cal que la guardis, nomes que la llegeixis
    ·transformes el 
*/
app.post('/upload',[
    storeFileInDisk, 
    extractLinesArrayFromFile, 
    getJsonsFromLines ],
    (req, res) => {
        if (req.body.store !== "true") exec(`rm -f ${req.file.path}`);
        
        res.status(200).send(req.parsedFile)
    
    
});







app.listen(3000,() => console.log(`Server escoltant al port 3000`))