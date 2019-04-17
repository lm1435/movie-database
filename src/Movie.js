import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = ({
  movie: {
    title,
    poster_path: posterPath,
    id,
  },
}) => (
  <Link to={`/${id}`}>
    <Poster src={`${POSTER_PATH}${posterPath}`} alt={`${title} Movie Poster`} />
  </Link>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string,
  }).isRequired,
};

export default Movie;

export const Poster = styled.img`
  box-shadow: 0 0 35px black;
`;
