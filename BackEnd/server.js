const express = require('express');
const app = express();
const port = 4000

// require cors library
const cors = require('cors');
const bodyparser = require("body-parser");

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
app.use(bodyparser.json);

// get request, example code from expess
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// get requests coming into this url
app.get('/api/movies', (req, res) => {

    //Hardcode JSON movie information
    const mymovies = [
        {
            "Title":"Avengers: Infinity War",
            "Year":"2018",
            "imdbID":"tt4154756",
            "Type":"movie",
            "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@"
        },
        {
            "Title":"Captain America: Civil War",
            "Year":"2016",
            "imdbID":"tt3498820",
            "Type":"movie",
            "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@"
        },
        {
            "Title":"World War Z",
            "Year":"2013",
            "imdbID":"tt0816711",
            "Type":"movie",
            "Poster":"https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@",
        }        
    ]; 

    // pass JSON movie along with other information/data to server / status 200 means OK
    res.status(200).json({
        message: "Everything is OK",
        movies: mymovies});

})

// body of a history message being passed up to a post request - takes body, bodyparser
app.post('/api/movies', (req, res) => {
    console.log('Movie Received');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})