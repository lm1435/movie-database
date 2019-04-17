import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

const MovieGrid = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  padding: 1rem 0;
  grid-template-columns: repeat(2, 1fr);

  @media(min-width:768px) {
    padding: 1rem;
    grid-template-columns: repeat(4, 1fr);
  }

  @media(min-width:1268px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media(min-width:1600px) {
    grid-template-columns: repeat(9, 1fr);
  }
`;

export default class MoviesList extends Component {
  state = {
    movies: [],
    error: null,
    isLoading: true,
  }

  async componentDidMount() {
    const movies = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=9725571b96179202ebd3830a5ee14d01&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
      .then(res => res.json())
      .catch((error) => {
        console.log('error', error); // eslint-disable-line no-console
        this.setState({ error, isLoading: false });
      });
    this.setState({
      movies: movies.results,
      isLoading: false,
    });
  }

  render() {
    const { error, movies, isLoading } = this.state;

    return (
      <React.Fragment>
        {(!isLoading && movies.length)
          ? (
            <MovieGrid>
              <React.Fragment>
                {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
              </React.Fragment>
            </MovieGrid>
          )
          : <p>{error}</p>}
      </React.Fragment>
    );
  }
}
