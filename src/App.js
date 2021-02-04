import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
       <div className="app">
          <Routes />
        </div>
      </Router>
    );
  }
}

export default App;
