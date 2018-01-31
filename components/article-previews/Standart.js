import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import * as Grammar from '../../services/grammar';

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
          <div className="layout-row layout-align-start-center layout-wrap">
            <div className="article-preview-date smaller">{Grammar.formatDate(props.publishedAt)}</div>
            <div className="article-preview-tags smaller">
              {
                props.tags.map(tag => (
                  <span className="article-preview-tag"><Link href={`/tag?tag=${tag}`} as={`/tag/${tag}`}><a>#{tag}</a></Link></span>
                ))
              }
            </div>
          </div>
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
  publishedAt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  large: PropTypes.bool,
  horizontal: PropTypes.bool,
};

ArticlePreviewStandart.defaultProps = {
  className: '',
  large: false,
  horizontal: false,
  tags: [],
};

export default ArticlePreviewStandart;
