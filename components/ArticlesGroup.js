import React from 'react';
import PropTypes from 'prop-types';
import ArticlePreview from './ArticlePreview';

class RelatedArticles extends React.Component {
  componentDidMount() {
    new window.Masonry('.masonry', { // eslint-disable-line
      itemSelector: '.article-preview',
      percentPosition: true,
      columnWidth: '.grid-sizer',
    });
  }

  render() {
    const previews = this.props.articles.map((article, index, array) => {
      if (array.length === 1) {
        return <ArticlePreview {...article} large horizontal className="grid-item-width-lg" />;
      }

      if (array.length === 2) {
        return <ArticlePreview {...article} large className="grid-item-width-md" />;
      }

      if (index === 0) {
        return <ArticlePreview {...article} large className="grid-item-width-md" />;
      }

      return <ArticlePreview {...article} className="grid-item-width-sm" />;
    });

    return (
      <div className="related-articles">
        <h2>{this.props.title}</h2>
        <div className="masonry children-equal-horizontal-padding">
          <div className="grid-sizer grid-item-width-sm" />
          {previews}
        </div>
      </div>
    );
  }
}

RelatedArticles.propTypes = {
  title: PropTypes.string,
  articles: PropTypes.arrayOf(PropTypes.object),
};

RelatedArticles.defaultProps = {
  title: 'Схожі статті',
  articles: [],
};

export default RelatedArticles;
