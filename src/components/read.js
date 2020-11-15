// import React - allows components to be defined as classes or functions.
import React from 'react';

// import Movies component
import { Movies } from './movies';

// http client make request and get a response back get method (axios can send and retrieve data)
import axios from 'axios'; // needs to be installed in project - npm install axios

// Read class
export class Read extends React.Component{

    // state object - stores JSON object of JSON collection of movie information
    // movies is now = to an empty array
    state = {
        movies: [ ]
    };

    // component lifecycle hook, gets called every time the component gets mounted/active in the view
    componentDidMount(){
        // make axios call to go and get data from this url, return promise and set it equal to our state
        axios.get('http://localhost:4000/api/movies')
        .then(response => { // fulfilled state
            this.setState({movies:response.data.movies}); // movies variable
        })
        .catch((error)=>{ // rejected state
            console.log(error)
        });
    }

    //render() method is the only required method in a class component, called by default
    // embed Movies component in Read component 
    // pass data from the Read state to the Movies component
    render(){
        return(          
            <div>                
                <h1>This is the Read Component</h1>                
                <Movies movies={this.state.movies}></Movies>
            </div>
        );
    }
}