const express = require('express');
const app = express();

const storeFileInDisk = require('./Middlewares/storeFileInDisk');
const getJsonsFromLines = require('./Middlewares/getJsonsFromLines');
const extractStringFromFile = require('./Middlewares/extractStringFromFile');
const storeEnclosedFields = require('./Middlewares/storeEnclosedFields');


app.post('/upload',[
    storeFileInDisk, 
    extractStringFromFile,
    storeEnclosedFields,
    getJsonsFromLines ],
    (req, res) => {    
    res.status(200).send(req.parsedFile)
});
app.listen(3000,() => console.log(`Server escoltant al port 3000`))