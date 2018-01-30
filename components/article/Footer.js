import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import * as Grammar from '../../services/grammar';
import ProjectPreview from '../../components/ProjectPreview';

const ArticleFooter = props => (
  <div className={`article-footer ${props.className}`}>
    <div className="text-center layout-gt-xs-row layout-align-space-between-center">
      <div className="article-footer-date">{Grammar.formatPostDate(props.date)}</div>
      <ul className="article-footer-tags">
        {
          props.tags.map(tag => (
            <li className="article-footer-tag" key={tag}>
              <Link href={`tag?tag=${tag}`} as={`/tag/${tag}`}>
                <a>#{tag}</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
    {props.project && <ProjectPreview {...props.project} short />}
    <hr className="article-footer-separator" />
  </div>
);

ArticleFooter.propTypes = {
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  project: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    path: PropTypes.string,
  }),
  className: PropTypes.string,
};

ArticleFooter.defaultProps = {
  tags: [],
  project: null,
  className: '',
};

export default ArticleFooter;
