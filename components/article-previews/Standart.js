import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import * as Grammar from '../../services/grammar';
import Colors from '../../services/colors';

const ArticlePreviewStandart = (props) => {
  const classList = ['article-preview', props.className];
  const style = {};
  const { averageColor } = props.image;
  const { from, to } = averageColor
    ? Colors.RGBToGradient(...averageColor)
    : Colors.stringToHEXGradient(props.title);

  let backgroundImageURL = props.image.medium;

  if (!props.large) {
    backgroundImageURL = props.image.small;
    classList.push('article-preview-small');
  }

  if (props.horizontal) {
    classList.push('article-preview-horizontal');
  }

  if (props.withFooter) {
    classList.push('article-preview-with-footer');
  }

  style.backgroundImage = `url("${backgroundImageURL}"), linear-gradient(to bottom right, ${from}, ${to})`;

  return (
    <div className={classList.join(' ')}>
      <Link href={`/article?path=${props.path}`} as={`/${props.path}`}>
        <a className="article-preview-image-wrapper aspect-ratio-16-10">
          <div className="article-preview-image" style={style} />
          <div className="article-preview-image-shadow" />
        </a>
      </Link>
      <div className="article-preview-text">
        <Link href={`/article?path=${props.path}`} as={`/${props.path}`}>
          <a>
            <h3 className="article-preview-title">{props.title}</h3>
            <p className="article-preview-brief">{props.brief}</p>
          </a>
        </Link>
        <div className="article-preview-footer layout-row layout-align-start-center layout-wrap">
          <div className="article-preview-date smaller">{Grammar.formatDate(props.publishedAt)}</div>
          <div className="article-preview-tags smaller">
            {
              props.tags.map(tag => (
                <span key={tag} className="article-preview-tag"><Link href={`/tag?tag=${tag}`} as={`/tag/${tag}`}><a>#{tag}</a></Link></span>
              ))
            }
          </div>
        </div>
        <div className="article-preview-bottomline" />
      </div>
    </div>
  );
};

ArticlePreviewStandart.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    original: PropTypes.string,
    large: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
    averageColor: PropTypes.arrayOf(PropTypes.number),
  }),
  path: PropTypes.string.isRequired,
  brief: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  large: PropTypes.bool,
  horizontal: PropTypes.bool,
  withFooter: PropTypes.bool,
};

ArticlePreviewStandart.defaultProps = {
  className: '',
  large: false,
  horizontal: false,
  withFooter: false,
  tags: [],
  image: {},
};

export default ArticlePreviewStandart;
