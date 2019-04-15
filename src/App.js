import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  state = {
    movies: [],
    error: null,
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=9725571b96179202ebd3830a5ee14d01&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const { error, movies } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {'<Luis\' Favorite Movies />'}
        </header>
        {!error
          ? (
            <React.Fragment>
              {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
            </React.Fragment>
          )
          : <p>An Error Occured Please Try Again.</p>
        }
      </div>
    );
  }
}

export default App;
