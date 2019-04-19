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

const Button = styled.button`
  display: flex;
  justify-content: center;
  margin: 2rem auto;
  padding: 1rem 2rem;
  box-shadow: 0 0 35px black;
  background: #111;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const URL = 'https://api.themoviedb.org/3/discover/movie?api_key=9725571b96179202ebd3830a5ee14d01&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=';
const PAGE_PARAM = 1;

export default class MoviesList extends Component {
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
    const {
      error, movies, isLoading, pageNumber,
    } = this.state;

    return (
      <React.Fragment>
        {(!isLoading && movies.length)
          ? (
            <React.Fragment>
              <MovieGrid>
                {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
              </MovieGrid>
              <Button type="button" onClick={() => this.updatePageNumber(pageNumber + 1)}>Keep Searching</Button>
            </React.Fragment>
          )
          : <p>{error}</p>}
      </React.Fragment>
    );
  }
}
