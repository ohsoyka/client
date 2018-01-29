import React from 'react';
import PropTypes from 'prop-types';
import { Parallax } from 'react-parallax';

const Header = props => (
  <Parallax
    bgImage={props.image}
    strength={200}
    className="article-header"
  >
    <h1 className="article-title">{props.title}</h1>
  </Parallax>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Header;
