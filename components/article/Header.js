import React from 'react';
import PropTypes from 'prop-types';
import { Parallax, Background } from 'react-parallax';
import generateBackgroundGradient from '../../helpers/generate-background-gradient';

const ArticleHeader = (props) => {
  const { from, to } = generateBackgroundGradient(props);
  const backgroundImage = `url("${props.image.large}"), linear-gradient(to bottom right, ${from}, ${to})`;

  return (
    <Parallax
      strength={300}
      className="article-header"
    >
      <Background className="article-header-background-wrapper">
        <div className="article-header-background" style={{ backgroundImage }} />
      </Background>
      <div className="article-header-content">
        <h1 className="article-title balance-text">{props.title}</h1>
      </div>
    </Parallax>
  );
};

ArticleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    original: PropTypes.string,
    large: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
    averageColor: PropTypes.arrayOf(PropTypes.number),
  }),
};

ArticleHeader.defaultProps = {
  image: {},
};

export default ArticleHeader;
