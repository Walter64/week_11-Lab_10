// the React.Component into project
import React, { Component } from 'react';

// import the original boiler plate logo
import logo from './logo.svg';

// import the css styles in the App.css file
import './App.css';

// imports user defined interactive components
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Content } from './components/content';

// enables project to the bootstrap css design templates
import 'bootstrap/dist/css/bootstrap.min.css';

// A responsive navigation header, including support for branding, navigation, and more
import {Navbar, Nav} from 'react-bootstrap';

// Uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// imports the Create and Read classes
import { Create } from './components/create';
import { Read } from './components/read';
import { Edit } from './components/edit';

// App class - no need to use extends 'React.Component' just Component as Component is already imported
class App extends Component {

  //  When the component file is called it calls the render() method by default because that component needs to display the HTML markup or we can say JSX syntax.
  render(){

    // return a reference to the component or return null for stateless components
    return (
      // wrap Navbar, Switch, Route components within BrowserRouter.
      // Switch component will only render the first route that matches/includes the path
      // Route - once it finds the first route that matches the path, won't look for other matches
      // exact returns any number of routes that match exactly
      <Router>
        <div className="App">
        <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/read">Read</Nav.Link>
            <Nav.Link href="/create">Create</Nav.Link>
          </Nav>
        </Navbar>

        <br />

        <Switch>
          <Route path='/' component={Content} exact/>
          <Route path='/create' component={Create}></Route>
          <Route path='/read' component={Read}></Route>
          <Route path='/edit/:id' component={Edit}></Route>
        </Switch>
        </div>
      </Router>      
    );
  }
}

// exports the module App, can be only one default export per file
export default App;
