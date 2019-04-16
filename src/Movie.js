import React from 'react';
import PropTypes from 'prop-types';

const Movie = ({
  movie: {
    title,
    overview,
  },
}) => (
  <div>
    <h3>{title}</h3>
    <p>{overview}</p>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Movie;
