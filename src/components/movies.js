// import React - allows components to be defined as classes or functions.
import React from 'react';

// imports MovieItem
import {MovieItem} from './movieItem';

// Movies class
export class Movies extends React.Component{

    //render() method is the only required method in a class component, called by default
    render(){

         // props accesses whats being passed as a property to this Component
         // create a movieItem for each movie
         // use Map function - takes our movies collection and splits collection into each section/movie
        return this.props.movies.map( (movie)=>{ // arrow function - each data item is called movie 
            
            // pass movie data item to new components to MovieItem display a movie
            // pass ReloadData method to movies children, the grandchildren of read component
            return <MovieItem movie={movie} ReloadData={this.props.ReloadData}></MovieItem>
        })
    }
}