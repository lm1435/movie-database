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


const MoviesList = ({
  updatePageNumber,
  state: {
    error,
    movies,
    isLoading,
    pageNumber,
  },
}) => (
  <React.Fragment>
    {(!isLoading && movies.length)
      ? (
        <React.Fragment>
          <MovieGrid>
            {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
          </MovieGrid>
          <Button type="button" onClick={() => updatePageNumber(pageNumber + 1)}>Keep Searching</Button>
        </React.Fragment>
      )
      : <p>{error}</p>}
  </React.Fragment>
);

export default MoviesList;
