import React from 'react';
import PropTypes from 'prop-types';
import { Parallax, Background } from 'react-parallax';
import generateBackgroundGradient from '../../helpers/generate-background-gradient';

function generateBackgroundImageCSSString(image, from, to) {
  const gradientCSS = `linear-gradient(to bottom right, ${from}, ${to})`;
  const imageCSS = image && image.large ? `url("${image.large}")` : '';

  return [imageCSS, gradientCSS].filter(item => item).join(', ');
}

const ArticleHeader = (props) => {
  const { from, to } = generateBackgroundGradient(props);
  const { image, portraitImage } = props;
  const backgroundLandscapeImage = generateBackgroundImageCSSString(image || portraitImage, from, to);
  const backgroundPortraitImage = generateBackgroundImageCSSString(portraitImage || image, from, to);

  return (
    <Parallax
      strength={300}
      className="article-header"
    >
      <Background className="article-header-background-wrapper-landscape">
        <div className="article-header-background" style={{ backgroundImage: backgroundLandscapeImage }} />
      </Background>
      <Background className="article-header-background-wrapper-portrait">
        <div className="article-header-background" style={{ backgroundImage: backgroundPortraitImage }} />
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
  portraitImage: PropTypes.shape({
    original: PropTypes.string,
    large: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
    averageColor: PropTypes.arrayOf(PropTypes.number),
  }),
};

ArticleHeader.defaultProps = {
  image: {},
  portraitImage: {},
};

export default ArticleHeader;
