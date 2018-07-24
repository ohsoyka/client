import React from 'react';
import PropTypes from 'prop-types';
import ArticlePreview from './ArticlePreview';

class ArticlesGroup extends React.Component {
  constructor(props) {
    super(props);

    this.wrapperElement = React.createRef();
  }

  componentDidMount() {
    new window.Masonry(this.wrapperElement.current, { // eslint-disable-line
      itemSelector: '.article-preview',
      percentPosition: true,
      columnWidth: '.grid-sizer',
    });
  }

  render() {
    const previews = this.props.articles.map((article, index, array) => {
      const classList = Object.keys(this.props.articlesCount).map((breakpointName) => {
        const articlesToShow = this.props.articlesCount[breakpointName];

        if (index >= articlesToShow) {
          return `hide-${breakpointName}`;
        }

        return '';
      });

      if (array.length === 1) {
        classList.push('grid-item-width-lg');

        return <ArticlePreview {...article} large horizontal key={article.id} className={classList.join(' ')} />;
      }

      if (array.length === 2) {
        classList.push('grid-item-width-md');

        return <ArticlePreview {...article} large key={article.id} className={classList.join(' ')} />;
      }

      if (index === 0) {
        classList.push('grid-item-width-md');

        return <ArticlePreview {...article} large key={article.id} className={classList.join(' ')} />;
      }

      classList.push('grid-item-width-sm');

      return <ArticlePreview {...article} key={article.id} className={classList.join(' ')} />;
    });

    return (
      <div className="articles-group children-horizontal-padding-1" ref={this.wrapperElement}>
        <div className="grid-sizer grid-item-width-sm" />
        {previews}
      </div>
    );
  }
}

ArticlesGroup.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  articlesCount: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
};

ArticlesGroup.defaultProps = {
  articles: [],
  articlesCount: {},
};

export default ArticlesGroup;
