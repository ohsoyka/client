import React from 'react';
import PropTypes from 'prop-types';
import { Parallax, Background } from 'react-parallax';

const ArticleHeader = props => (
  <Parallax
    strength={300}
    className="article-header"
  >
    <Background className="article-header-background-wrapper">
      <div className="article-header-background" style={{ backgroundImage: `url("${props.image}")` }} />
    </Background>
    <div className="article-header-content">
      <h1 className="article-title balance-text">{props.title}</h1>
    </div>
  </Parallax>
);

ArticleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ArticleHeader;
