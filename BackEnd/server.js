const express = require('express');
const app = express();
const port = 4000

// require cors library
const cors = require('cors');
const bodyparser = require("body-parser");

// include mongoose on server
const mongoose = require('mongoose');

// we want to use cors package every time
app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

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

// listen for get request on localhost:4000/api/movies/id, return the movie of entered id if it exists
app.get('/api/movies/:id', (req, res)=>{
    console.log(req.params.id);

    // find movie by its ID
    MovieModel.findById(req.params.id, (err, data)=>{
        res.json(data);
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
    });

    // send confirmation down to client that movie is created
    res.send('Item Added');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})