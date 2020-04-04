import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Colors from '../../services/colors';

const ArticlePreviewFullScreen = (props) => {
  const classList = ['article-preview', 'article-preview-fullscreen', props.className];
  const style = {};
  const { averageColor } = props.image || {};
  const { from, to } = averageColor
    ? Colors.RGBToGradient(...averageColor)
    : Colors.stringToHEXGradient(props.title);

  style.backgroundImage = `url("${props.image ? props.image.large : null}"), linear-gradient(to bottom right, ${from}, ${to})`;

  return (
    <div className={classList.join(' ')} style={style}>
      <div className="article-preview-fullscreen-content">
        <Link href={`/article?path=${props.path}`} as={`/${props.path}`}>
          <a><h1 className="article-preview-fullscreen-title balance-text">{props.title}</h1></a>
        </Link>
        <div className="article-preview-fullscreen-description">{props.brief}</div>
      </div>
    </div>
  );
};

ArticlePreviewFullScreen.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    original: PropTypes.string,
    large: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
    averageColor: PropTypes.arrayOf(PropTypes.number),
  }),
  path: PropTypes.string.isRequired,
  brief: PropTypes.string,
  className: PropTypes.string,
};

ArticlePreviewFullScreen.defaultProps = {
  brief: '',
  image: {},
  className: '',
};

export default ArticlePreviewFullScreen;
