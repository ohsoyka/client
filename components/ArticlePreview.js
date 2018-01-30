import React from 'react';
import PropTypes from 'prop-types';
import Standart from './article-previews/Standart';
import FullScreen from './article-previews/FullScreen';

const ArticlePreview = (props) => {
  if (props.fullScreen) {
    return <FullScreen {...props} />;
  }

  return <Standart {...props} />;
};

ArticlePreview.propTypes = {
  fullScreen: PropTypes.bool,
};

ArticlePreview.defaultProps = {
  fullScreen: false,
};

export default ArticlePreview;
