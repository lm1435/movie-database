import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = ({
  movie: {
    title,
    poster_path: posterPath,
    id,
  },
}) => (
  <div>
    <Link to={`/${id}`}>
      <img src={`${POSTER_PATH}${posterPath}`} alt={`${title} Movie Poster`} />
    </Link>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string,
  }).isRequired,
};

export default Movie;
