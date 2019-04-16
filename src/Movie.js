import React from 'react';
import PropTypes from 'prop-types';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = ({
  movie: {
    title,
    overview,
    poster_path: posterPath,
  },
}) => (
  <div>
    <img src={`${POSTER_PATH}${posterPath}`} alt={title} />
    <h3>{title}</h3>
    <p>{overview}</p>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string,
  }).isRequired,
};

export default Movie;
