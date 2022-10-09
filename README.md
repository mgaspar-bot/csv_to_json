# csv_to_json
This project consists on an API which receives POST requests containing a CSV file and returns a response with the contents of the file in JSON format

## Installation
You'll need to have git, node and npm in your computer to run it. First you'll have to clone this repository:
```shell
    git clone https://github.com/mgaspar-bot/csv_to_json "your_local_directory"
```
cd to your local cloned directory and run:
```shell
    npm install 
```
With that you'll have all the necessary packages

## Usage
Inside the 'app' directory, run:
```shell
    npm start
    #Or
    node server.js 
    #Start with nodemon:
    npm run devStart 
```
This will start a server in your localhost:3000 to which you can send http POST requests.The server will expect a csv file inside a "multipart/form-data" field called "csvfile". The server will parse the contents of the CSV file and return it inside the body of the response, in a JSON with a field called "document" which will contain an array with a JSON for each line of your CSV. The program defines what is a valid CSV format following this document:
>https://docs.fileformat.com/spreadsheet/csv/#csv-file-format
<br>
By default, the program will use the first line as the name of the fields. If you add a field to your request with the name "no_header" and the value "true" the first line will be parsed normally and the name of the fields will be "column_0", "column_1" etc. 
<br>
The repository contains a POSTMAN collection and a directory with dummy CSVs so you can test the behaviour of the program. Be warned, it is quite slow with big files (in my computer, about 2 minutes to parse a 1mb file)