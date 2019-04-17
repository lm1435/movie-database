import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Poster } from './Movie';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

export default class MovieDetail extends Component {
  state = {
    movie: {},
    error: null,
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=9725571b96179202ebd3830a5ee14d01&language=en-US`);
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
            <MovieWrapper backdrop={`${BACKDROP_PATH}${backdropPath}`}>
              <MovieInfo>
                <Poster src={`${POSTER_PATH}${posterPath}`} alt={`${title} Movie Poster`} />
                <div>
                  <h1>{title}</h1>
                  <h3>{releaseDate}</h3>
                  <p>{overview}</p>
                </div>
              </MovieInfo>
            </MovieWrapper>
          )
          : (
            <ErrorWrapper>
              This is embarrasing, there was an error. Please go
              {' '}
              <Link to="/">home</Link>
            </ErrorWrapper>
          )
      }
      </React.Fragment>
    );
  }
}

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;

const ErrorWrapper = styled.p`
  color: white;
  height: 100vh;
  padding-top: 50%;
  a {
    color: white;
  }
`;