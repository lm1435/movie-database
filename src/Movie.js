import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Overdrive from "react-overdrive";

const POSTER_PATH = "https://image.tmdb.org/t/p/w154";

const Movie = ({ movie: { title, id, poster_path: posterPath } }) => (
  <Link to={`/${id}`}>
    <Overdrive id={`${id}`}>
      <Poster
        src={`${POSTER_PATH}${posterPath}`}
        alt={`${title} Movie Poster`}
      />
    </Overdrive>
  </Link>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Movie;

export const Poster = styled.img`
  box-shadow: 0 0 35px black;
`;
