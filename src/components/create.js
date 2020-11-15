// import React - allows components to be defined as classes or functions.
import React from 'react';
import axios from 'axios'; // http client communicates via http on the web

// Create class
export class Create extends React.Component {

    constructor() {
        // to use forms, invoke parent constructor React.Component 
        super();

        // bind events to this instance of the class 
        this.onChangeMovieTitle = this.onChangeMovieTitle.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // set values = to blank / empty string when constructor is called
        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }

    } // end constructor

    // update state when value of Title changes
    onChangeMovieTitle(e) {
        this.setState({
            Title: e.target.value
        });
    }

    // update state when value of Year changes
    onChangeMovieYear(e) {
        this.setState({
            Year: e.target.value
        });
    }

    // update state when value of Poster changes
    onChangeMoviePoster(e) {
        this.setState({
            Poster: e.target.value
        });
    }

    // alert displays new state values when 'Add Movies" button is clicked
    onSubmit(e) {
        alert("Movie Added\n-------------\n"
            + this.state.Title + "\n"
            + this.state.Year + "\n"
            + this.state.Poster);

            // new object newMovie
            const newMovie = {
                // pass up
                title:this.state.Title,
                year:this.state.Year,
                poster:this.state.Poster
            }

            // use axios here use http client, makes post asynchronously
            axios.post('http://localhost:4000/api/movies',newMovie) // send newMovie object
            .then((res) =>{
                console.log(res);
            }) 
            .catch((err) =>{
                console.log(err);
            });
    }

    //render() method is the only required method in a class component, called by default
    render() {
        return (
            // add a form to component to upload data to server
            <div className="App">
                <h1>This is the Create component</h1>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Movie Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Title}
                            onChange={this.onChangeMovieTitle}
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Add Movie Year:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Year}
                            onChange={this.onChangeMovieYear}
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Add Movie Poster:</label>
                        <textarea
                            type="text"
                            className="form-control"
                            value={this.state.Poster}
                            onChange={this.onChangeMoviePoster}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <input type="submit"
                            value="Add Movies"
                            className="btn btn-primary">
                        </input>
                    </div>
                </form>
            </div>

        ); // end return statement

    } // end render() method

} // end Create class