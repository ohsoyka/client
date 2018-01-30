import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const ArticlePreviewStandart = (props) => {
  const classList = ['article-preview', props.className];

  if (!props.large) {
    classList.push('article-preview-small');
  }

  if (props.horizontal) {
    classList.push('article-preview-horizontal');
  }

  return (
    <Link href={`/article?path=${props.path}`} as={`/${props.path}`}>
      <a className={classList.join(' ')}>
        <div className="article-preview-image-wrapper aspect-ratio-16-10">
          <div className="article-preview-image" style={{ backgroundImage: `url("${props.featuredImage}")` }} />
          <div className="article-preview-image-shadow" />
        </div>
        <div className="article-preview-text">
          <h3 className="article-preview-title">{props.title}</h3>
          <p>{props.brief}</p>
          <div className="article-preview-bottomline" />
        </div>
      </a>
    </Link>
  );
};

ArticlePreviewStandart.propTypes = {
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  brief: PropTypes.string.isRequired,
  className: PropTypes.string,
  large: PropTypes.bool,
  horizontal: PropTypes.bool,
};

ArticlePreviewStandart.defaultProps = {
  className: '',
  large: false,
  horizontal: false,
};

export default ArticlePreviewStandart;
