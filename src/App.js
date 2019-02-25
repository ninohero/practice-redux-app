import React from 'react';
import { Route } from 'react-router-dom';
import NytSearch from './containers/NytSearch';
import People from './containers/People';
import logo from './logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <Route path='search' component={NytSearch} />
    <Route path='results' component={People}/>
    <button onClick={(e) => this.getArticles(e)}>Load Articles</button>
  </div>
);

export default App;
