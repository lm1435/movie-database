import React from 'react';

const Movie = (props) => {
  const {
    movie: {
      title,
      overview,
    },
  } = props;
  return (
    <div>
      <h3>{title}</h3>
      <p>{overview}</p>
    </div>
  );
};

export default Movie;
