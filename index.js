// NodeJS

// __dirname (two underscores)
// console.log(__dirname); //Absolute value of the path to the currently running script

// Core Module: path
// let path = require('path'); //Require imports path module into a variable
// console.log(path.dirname('app/assets.js')); //now you can use dirname an other methods on that variable
// console.log(path.extname('index.js'));
// console.log(path.join('/foo', 'bar', 'bas/asdf', '..', 'quux')); //Makes a path and Goes to the previous directory on the '..' (Arguments must be strings)
// console.log(path.join(__dirname, 'index.js')); //Value of the path the current script is in and then adds the index.js after, because of join

//Core Module: fs (File System)
// let fs = require('fs') //Imports the fs module into a variable
// let myFilePath = path.join(__dirname, 'data.json'); //looks where the script is running and adds data.json to the path
// fs.readFile(myFilePath, function(err, data) { //reads the myFilePath variable and has a function that has 2 parameters one to return an error and the other one to return the data, (if you dont use .tostring() the file returns a buffer)
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data.toString()); //data is a Buffer 
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


// //ExpressJS
// var express = require("express"); //Imports express module and assigns it to a var
// var app = express();

// app.get('/chirps', function(req, res) {
//     res.send("Hllo World!");
// });

// app.post('/chirps', function(req, res) {
//     res.send("Hello World!");
// });

// app.listen(3000);

//You can chain them like the following since you are using the same route
// var express = require("express"); 
// var app = express();
// app.route('/chirps')
//     .get(function(req,res){
//         res.send("Hllo World!");
//     }).post(function(req,res){
//         res.send("Hello World!");
//     });
//     app.listen(3000);

var express = require("express");
var app = express();
let path = require('path');
let bodyParser = require('body-parser');
let fs = require('fs');
let shortid_1 = require('short-id');

const base = '/api/chirps';
let pathVar = path.join(__dirname, 'data.json');

const ranID = function(req, res, next){
    return shortid_1.generate();
    next();
};

    app
    .disable('x-powered-by')
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, UPDATE, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));;

// app.route(base)
    //get chirps
    app.get(base, function(req,res){
        res.sendFile(pathVar); //sends the file in the pathVar route
    });
    //get 1 chirp typing id in route
    app.get(`${base}/:id`, function (req, res) {
        fs.readFile(pathVar, 'utf-8', function (err, file) {
            var parsedArray = JSON.parse(file);
            var found = parsedArray.filter(function (chirp) { return chirp.id === req.params.id; });
            
            var chirp = found[0];
            res.send(chirp).end();
        });
    });
    //post 1 chirp
    app.post(base, function (req, res) {
        fs.readFile(pathVar, 'utf-8', function (err, file) {
            var parsedFile = JSON.parse(file);
            var chirp = req.body;

            var id = ranID();
            chirp.id = id;

            parsedFile.push(chirp);
            fs.writeFile(pathVar, JSON.stringify(parsedFile), function (err) {
                if (err)
                    throw err;
                res.status(201).send(chirp).end();
            });
        });
    });
    //delete 1 chirp
    app.delete(base + "/:id", function (req, res) {
        fs.readFile(pathVar, 'utf-8', function (err, file) {
            var fileParsed = JSON.parse(file);
            var foundIndex = -1;
            fileParsed.map(function (chirp, i) {
                if (chirp.id === req.params.id) {
                    foundIndex = i;
                }
            });
            if (foundIndex === -1) {
                res.status(404).end();
                return;
            }
            fileParsed.splice(foundIndex, 1);
            fs.writeFile(pathVar, JSON.stringify(fileParsed), 'utf-8', function (err) {
                if (err)
                    throw err;
                
                res.status(202).end();
            });
        });
    });

    //Update 1 chirp
    app.put(base + "/:id", function (req, res) {
        fs.readFile(pathVar, 'utf-8', function (err, file) {
            var parsedArray = JSON.parse(file);
            var found = parsedArray.filter(function (chirp) { return chirp.id === req.params.id; });
            
            var chirp = found[0];

            var foundIndex = -1;
            parsedArray.map(function (chirp, i) {
                if (chirp.id === req.params.id) {
                    foundIndex = i;
                }
            });
            if (foundIndex === -1) {
                res.status(404).end();``
                return;
            }
            parsedArray.splice(foundIndex, 1);
            
            // req.body = chirp
            

            let newChirp = req.body;
            
            
          

             chirp = newChirp;
             
             console.log(chirp);
             parsedArray.push(chirp);
             fs.writeFile(pathVar, JSON.stringify(parsedArray), function (err) {
                if (err)
                    throw err;
                
            });
          

          
            // let updatedChirp = req.body
            // console.log(updatedChirp);
         
          
           
            res.send(chirp).end();
        });
    
    });
    app.listen(3001);
    

    // app.update(base, function (req, res) {
    //     fs.readFile(pathVar, 'utf-8', function (err, file) {
    //         var parsedFile = JSON.parse(file);
    //         var chirp = req.body;

    //         var id = ranID();
    //         chirp.id = id;

    //         parsedFile.push(chirp);
    //         fs.writeFile(pathVar, JSON.stringify(parsedFile), function (err) {
    //             if (err)
    //                 throw err;
    //             res.status(201).send(chirp).end();
    //         });
    //     });
    // });






        // app.put(`${base}/:id`, function (req, res) {
    //     fs.readFile(pathVar, 'utf-8', function (err, file) {
    //         var parsedArray = JSON.parse(file);
    //         var found = parsedArray.filter(function (chirp) { return chirp.id === req.params.id; });
            
    //         var chirp = JSON.stringify(found[0]);
            
    //         chirp = {"name":"daniel","id":"2","message":"hola"};
            
    //         let parsedChirp = JSON.parse(chirp);
    //         console.log(parsedChirp);
    //         res.send(chirp);
            
    //         // chirp = {"name":"kassadim","id":"2","message":"asdfsadfd"};
    //         // JSON.parse(chirp);
    //         // res.send(chirp).end();
    //     });
    // })
    // app.put(`${base}/:id`, function(req, res){
    //     fs.readFile(pathVar, 'utf-8', function (err, file) {
    //         var parsedArray = JSON.parse(file);
    //         var found = parsedArray.filter(function (chirp) { return chirp.id === req.params.id; });
            
    //         var chirp = JSON.stringify(found[0]);
    //         let updatedChirp = chirp.name = 'asdf'
    //         res.send(chirp).end();
    // })



    // app.route('/api/chirps/:id')
    // .get(function(req,res){
    //     let pathVar = path.join(__dirname, 'data.json')
    //     // if (req.params === id(how do i get the id of data.json)) 
    //     // than show the shirp with that id
    //     console.log(req.params);
        
    //     res.sendFile(pathVar); //sends the file in the pathVar route
        
    // }).post(function(req,res){
    //     res.send("Hello World!");
    // });
    // app.listen(3000);



    // Request Body
    // npm install body=parser --save

    // var clientPath = path.join(__dirname, '../data.json');
    // app.use(express.static(clientPath));

    // res.set('Content-Type', 'text/plain'); Sets headers on the response

    // res.sendStatus(200); Sets a status to the response, you can change the number of the status and respond with something

    // REST API main types of routes 
    // Collection: /api/auction
    // Item: /api/auctions/id








// Questions
// I couldnt get the middleware to work, explain please

//explain bodyParser
// fs.writeFile




// - create chirp //Done
// - get all chirps  /api/chirps //Done
// - delete chirp //Done
// - update chirp 
// - get chirp /api/chirps/id //Done

// collection url: /api/chirps
// item url: /api/chirps/:id

// you will need to generate random ids for the chirps
// (hint you can use a module called shortid, you can also make it a middleware function. but if you do, don't forget to call next())

// index.js
// data.json
// package.json