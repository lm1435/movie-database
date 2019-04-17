import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          {'<Luis\' Movies Database/>'}
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route exact path="/:id" component={MovieDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;
