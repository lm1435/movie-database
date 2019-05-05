import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export default class MovieDetail extends Component {
  state = {
    movie: {},
    error: '',
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=9725571b96179202ebd3830a5ee14d01&language=en-US`)
      .then(res => res.json())
      .then(res => this.setState({ movie: res }, this.formatDate))
      .catch(error => this.state({ error }));
  }

  formatDate = () => {
    const {
      movie: {
        release_date: date,
      },
    } = this.state;
    const splitDate = date.split('-');
    this.setState({ formattedDate: `${month[splitDate[1] - 1]}\u0020 ${`${splitDate[2]},`} \u0020${splitDate[0]}` });
  }

  render() {
    const {
      formattedDate,
      error,
      movie,
      movie: {
        title,
        overview,
        poster_path: posterPath,
        backdrop_path: backdropPath,
        id,
      },
    } = this.state;

    return (
      <React.Fragment>
        {!error ? (
          <React.Fragment>
            {Object.keys(movie).length > 0 && (
              <MovieWrapper backdrop={`${BACKDROP_PATH}${backdropPath}`}>
                <MovieInfo>
                  <Overdrive id={`${id}`}>
                    <Poster src={`${POSTER_PATH}${posterPath}`} alt={`${title} Movie Poster`} />
                  </Overdrive>
                  <div>
                    <h1>{title}</h1>
                    <h3>{formattedDate}</h3>
                    <p>{overview}</p>
                  </div>
                </MovieInfo>
              </MovieWrapper>
            )}
          </React.Fragment>
        ) : (
          <ErrorWrapper>
            This is embarrasing, there was an error. Please go
            {' '}
            <Link to="/">home</Link>
          </ErrorWrapper>
        )}
      </React.Fragment>
    );
  }
}

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
  @media (max-width:767px) {
    background-size: contain;
    padding-top: 25vh;
  }
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  img {
      position: relative;
      top: -5rem;
  }
  @media (min-width: 768px) {
    display: flex;
    > div {
      margin-left: 20px;
    }
  }
  @media (max-width:767px) {
    height: 100vh;
    img {
      display: flex;
      margin: auto;
      top: 0;
    }
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
