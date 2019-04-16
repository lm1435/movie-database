import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import MoviesList from './MoviesList';

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
        <Route exact path="/:title" component={Test} />
      </Switch>
    </div>
  </Router>
);

export default App;

const Test = ({ match }) => (
  <h1>{match.params.title}</h1>
);
