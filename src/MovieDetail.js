import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

export default class MovieDetail extends Component {
  state = {
    movie: {},
    error: null,
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://ai.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=9725571b96179202ebd3830a5ee14d01&language=en-US`);
      const movie = await res.json();
      this.setState({
        movie,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const {
      error,
      movie: {
        title,
        release_date: releaseDate,
        overview,
        poster_path: posterPath,
        backdrop_path: backdropPath,
      },
    } = this.state;
    return (
      <React.Fragment>
        {!error
          ? (
            <div>
              <img src={`${POSTER_PATH}${posterPath}`} alt={`${title} Movie Poster`} />
              <img src={`${BACKDROP_PATH}${backdropPath}`} alt={`${title} Movie Poster`} />
              <h1>{title}</h1>
              <h3>{releaseDate}</h3>
              <p>{overview}</p>
            </div>
          )
          : (
            <p>
              This is embarrasing, there was an error. Please go
              <Link to="/"> home</Link>
            </p>
          )
      }
      </React.Fragment>
    );
  }
}
