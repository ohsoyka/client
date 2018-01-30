import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const ArticlePreviewFullScreen = (props) => {
  const classList = ['article-preview', 'article-preview-fullscreen', props.className];

  return (
    <div className={classList.join(' ')} style={{ backgroundImage: `url("${props.featuredImage}")` }}>
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
  featuredImage: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  brief: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ArticlePreviewFullScreen.defaultProps = {
  className: '',
};

export default ArticlePreviewFullScreen;
