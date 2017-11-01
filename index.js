// NodeJS

// __dirname (two underscores)
// console.log(__dirname); //Absolute value of the path to the currently running script

// Core Module: path
// let path = require('path'); //Require imports path module
// console.log(path.dirname('app/assets.js'));
// console.log(path.extname('index.js'));
// console.log(path.join('/foo', 'bar', 'bas/asdf', '..', 'quux')); //Makes a path and Goes to the previous directory on the '..' (Arguments must be strings)
// console.log(path.join(__dirname, 'index.js')); //Value of the path the current script is in and then adds the index.js after, because of join

//Core Module: fs
// let fs = require('fs') //Imports the fs module into a variable
// let myFilePath = path.join(__dirname, 'data.json'); //looks where the script is running and adds data.json to the path
// fs.readFile(myFilePath, function(err, data) { //reads the myFilePath variable and has a function that has 2 parameters one to return an error and the other one to return the data, (if you dont use .tostring() the file returns a buffer)
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data.toString()); //data is a Buffer (Question what is a buffer?)
//     }
// });

// //utf8 does the same thing but it returns a string already, so you dont have to use .toString()

// fs.readFile("data.json", "utf8", function(err, data) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data); //already a String
//     }
// });

// Core Module: http

// let http = require("http");

// let server = http.createServer(function(req, res) {

    
//  //This function gets called when the server gets a request
//  //req holds request data | res is for composing a response
//  //req.method shows request method (GET, POST, PUT, DELETE)
// });

// server.listen(3000); //3000, 8008, etc.


//ExpressJS
var express = require("express"); //Imports express module and assigns it to a var
var app = express();

app.get('/chirps', function(req, res) {
    res.send("Hllo World!");
});

app.post('/chirps', function(req, res) {
    res.send("Hello World!");
});

app.listen(3000);










// - create chirp
// - get all chirps
// - delete chirp
// - update chirp 
// - get chirp

// collection url: /api/chirps
// item url: /api/chirps/:id

// you will need to generate random ids for the chirps
// (hint you can use a module called shortid, you can also make it a middleware function. but if you do, don't forget to call next())

// index.js
// data.json
// package.json