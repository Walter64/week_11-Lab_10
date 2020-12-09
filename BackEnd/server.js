const express = require('express');
const app = express();
const port = 4000 // server on port 4000

// require cors library, while building app
// but not need after build as both front and back ends use localhost:4000
const cors = require('cors');

// to parse body data from post request
const bodyparser = require("body-parser");

// include mongoose on server
const mongoose = require('mongoose');

// to enable app to find the build folder and sub folders and files
const path = require('path');

// we want to use cors package every time
app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// where to find the build folder (configuration information method)
app.use(express.static(path.join(__dirname, '../build')));

// where to find the static folder (configuration information method)
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// parse application, x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: false}));

// parse application - json
app.use(bodyparser.json());

// connection string to be used to connect server to database
const myConnectionString = 'mongodb+srv://user64:H16ern1A@cluster-learningnode.fgkof.mongodb.net/movies?retryWrites=true&w=majority'; 

// made a connection between server and database using connection string
mongoose.connect(myConnectionString, {useNewUrlParser: true});

// define database schema - mongoose
const Schema = mongoose.Schema;

// generate schema, what type of data will be stored in mongoDB documents
var movieSchema = new Schema({
    title:String,
    year:String,
    poster:String
});

// movie collection base on movieSchema - use MovieModel to refer to the database, to write data to database
var MovieModel = mongoose.model("movie", movieSchema);

// get request, example code from expess
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// get requests coming into this url
app.get('/api/movies', (req, res) => {    
    // find all documents/data in database, send back data if it exists
    MovieModel.find((err, data)=>{
        res.json(data);
    })
})

// listen for get request on localhost:4000/api/movies/id
app.get('/api/movies/:id', (req, res)=>{
    console.log(req.params.id);

    // find document/movie by its unique id if it exists and return the data
    MovieModel.findById(req.params.id, (err, data)=>{
        res.json(data);
    })
})

// access database using unique document/movie id, and return data to client
app.put('/api/movies/:id', (req, res)=> {
    console.log("Update " + req.params.id); // pull id out of url

    // make an asnyc call to database, find record with this id, will then update this record
    // identify the document to be edited, using unique id passed up, object containing document/movie data
    MovieModel.findByIdAndUpdate(req.params.id, 
        req.body, {new:true},
        (err, data)=> {
            res.status(200).send(data);
        })
})

// listen for http delete method - when delete button is clicked
// get movie id at this URL to delete
app.delete('/api/movies/:id', (req, res)=>{
    console.log("Delete Movie: " + req.params.id); // message to console

    // find record and delete it in database by matching the id passed up, by interacting with data model using MovieModel
    MovieModel.findByIdAndDelete(req.params.id, (err, data)=>{
        // send back data, once executed
        res.send(data);
    })
})


// body of a history message being passed up to a post request - takes body, bodyparser
app.post('/api/movies', (req, res) => {
    // parse body of post to get data
    console.log('Movie Received');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    // interact with MovieModel / parse body of post to get data
    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    })
    .then()
    .catch();

    // send confirmation down to client that movie is created
    res.send('Item Added');
})

// for all other routes, other then what has been explicitely outline above
app.get('*', (req, res)=>{
    // send the index.html file back
    res.sendFile(path.join(__dirname + '/../build/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})