import React, { Component } from 'react';
import logo from '../logo.svg';
import '../style/App.css';

import ReposList from './ReposList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Facebook's list of products on GitHub</h1>
        <ReposList />
      </div>
    );
  }
}

export default App;
