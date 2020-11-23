// import React - allows components to be defined as classes or functions.
import React from 'react';

// import the 
import Card from 'react-bootstrap/Card';

export class MovieItem extends React.Component{

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
                </Card.Body>
                </Card>
            </div>
        );
    }
}