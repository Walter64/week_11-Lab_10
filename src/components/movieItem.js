// import React - allows components to be defined as classes or functions.
import React from 'react';

// import react-bootstrap to use Card 
import Card from 'react-bootstrap/Card';

// import react-bootstrap to use Button
import Button from 'react-bootstrap/Button';

// import axios
import axios from 'axios';

// 
import {Link} from 'react-router-dom';

export class MovieItem extends React.Component{

    // constructor 
    constructor(){
        super();

        // bind to instance of DeleteMovie function
        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    DeleteMovie(e){
        e.preventDefault();// stops unwanted multiple deletions
        console.log("Delete: " + this.props.movie._id); // message to console

        // call delete method up on server, send http delete request to this url,
        // delete this movie id from database, and return a promise
        axios.delete("http://localhost:4000/api/movies/" + this.props.movie._id)
        .then(()=>{
            // arrow function to invoke ReloadData function back in movies.js, movies.js
            // will then call ReloadData back in read.js which will update the movie list
            this.props.ReloadData();
        }) 
        .catch();
    }

    //render() method is the only required method in a class component, called by default
    render(){
        // returns each movie which is also styled using bootstrap's Card container
        return(
            <div>
                <Card>
                <Card.Header>{this.props.movie.title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <img src={this.props.movie.poster} width="200" height="300"/>                    
                    <footer className="blockquote-footer">
                        {this.props.movie.year}
                    </footer>
                    </blockquote>
                    <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
                    <Link to={"edit/" + this.props.movie._id} className="btn btn-primary">Edit</Link>
                </Card.Body>                
                </Card>
            </div>
        );
    }
}