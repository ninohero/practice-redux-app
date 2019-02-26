import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import NytSearch from './containers/NytSearch';
import People from './containers/People';
//import './sass/base.css';

const App = () => (
  <div>
    <div className="header text-center">
      <h1>API here</h1>
    </div>
    <Container className="container-fluid">
      <Route path='/' component={NytSearch} />
      <Route path='search' component={NytSearch} />
      <Route path='results' component={People}/>
    </Container>
  </div>
);

export default App;
