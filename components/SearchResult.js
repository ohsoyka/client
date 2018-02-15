import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const types = {
  article: 'Стаття',
  page: 'Сторінка',
  project: 'Проект',
  category: 'Категорія',
};

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.generateLink = this.generateLink.bind(this);
  }

  generateLink() {
    let href;
    let as;

    const { title, path, searchResultType } = this.props;

    switch (searchResultType) {
      case 'article': {
        href = `/article?path=${path}`;
        as = `/${path}`;
        break;
      }
      case 'page': {
        href = `/page?path=${path}`;
        as = `/pages/${path}`;
        break;
      }
      case 'project': {
        href = `/project?path=${path}`;
        as = `/projects/${path}`;
        break;
      }
      case 'category': {
        href = `/category?path=${path}`;
        as = `/categories/${path}`;
        break;
      }
      default: break;
    }

    return <Link href={href} as={as}><a>{title}</a></Link>;
  }

  render() {
    const {
      className,
      searchResultType,
      brief,
      tags,
    } = this.props;

    const type = types[searchResultType];
    const link = this.generateLink();
    const description = brief || this.props.description;

    return (
      <div className={`search-result ${className}`}>
        <div className="layout-row layout-align-start-center">
          <h3 className="search-result-title">{link}</h3>
          <div className="search-result-type margin-left-small smaller">/&nbsp;{type}</div>
        </div>
        {
          description && <div className="search-result-description">{description}</div>
        }
        {
          Boolean(tags.length) &&
          <div className="search-result-tags layout-row smaller">
            {
              tags.map(tag => <div key={tag}><Link href={`/tag?tag=${tag}`} as={`/tag/${tag}`}><a>#{tag}</a></Link></div>)
            }
          </div>
        }
      </div>
    );
  }
}

SearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  brief: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  searchResultType: PropTypes.oneOf(['article', 'page', 'project', 'category']).isRequired,
  className: PropTypes.string,
};

SearchResult.defaultProps = {
  brief: '',
  description: '',
  tags: [],
  className: '',
};

export default SearchResult;
