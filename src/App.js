import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import NytSearch from './containers/NytSearch';
import People from './containers/People';
import './src/sass/base.scss';

const App = () => (
  <Container>
    <Route path='/' component={NytSearch} />>
    <Route path='search' component={NytSearch} />
    <Route path='results' component={People}/>
  </Container>
);

export default App;
