import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PropTypes from 'prop-types';
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';
import rootReducer from './rootReducer';

const PAGE_PARAM = 1;
const URL = 'https://api.themoviedb.org/3/discover/movie?api_key=9725571b96179202ebd3830a5ee14d01&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=';
const store = createStore(rootReducer);

export default class App extends Component {
  state = {
    movies: [],
    error: null,
    isLoading: true,
    pageNumber: PAGE_PARAM,
  }

  componentDidMount() {
    const { pageNumber } = this.state;
    this.fetchMoreMovies(pageNumber);
  }

  fetchMoreMovies = (page) => {
    const { movies } = this.state;
    fetch(`${URL}${page}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          movies: [
            ...movies,
            ...res.results,
          ],
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  updatePageNumber = (pageNumber) => {
    this.setState({ pageNumber });
    this.fetchMoreMovies(pageNumber);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <header className="App-header">
              <Link to="/">
                {'<Luis\' Movies Database/>'}
              </Link>
            </header>
            <Switch>
              <Route exact path="/" render={props => (<MoviesList {...props} state={this.state} fetchMoreMovies={this.fetchMoreMovies} updatePageNumber={this.updatePageNumber} />)} />
              <Route exact path="/:id" component={MovieDetail} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({
    movies: PropTypes.array.isRequired,
  }),
};

App.defaultProps = {
  state: {
    movies: [{}],
  },
};
