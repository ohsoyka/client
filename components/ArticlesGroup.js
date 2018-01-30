import React from 'react';
import PropTypes from 'prop-types';
import ArticlePreview from './ArticlePreview';

class RelatedArticles extends React.Component {
  constructor(props) {
    super(props);

    const id = props.articles.map(article => article.id).join('');

    this.state = { id };
  }

  componentDidMount() {
    new window.Masonry(`.articles-group[data-id="${this.state.id}"]`, { // eslint-disable-line
      itemSelector: '.article-preview',
      percentPosition: true,
      columnWidth: '.grid-sizer',
    });
  }

  render() {
    const previews = this.props.articles.map((article, index, array) => {
      if (array.length === 1) {
        return <ArticlePreview {...article} large horizontal key={article.id} className="grid-item-width-lg" />;
      }

      if (array.length === 2) {
        return <ArticlePreview {...article} large key={article.id} className="grid-item-width-md" />;
      }

      if (index === 0) {
        return <ArticlePreview {...article} large key={article.id} className="grid-item-width-md" />;
      }

      return <ArticlePreview {...article} key={article.id} className="grid-item-width-sm" />;
    });

    return (
      <div data-id={this.state.id} className="articles-group children-equal-horizontal-padding-1">
        <div className="grid-sizer grid-item-width-sm" />
        {previews}
      </div>
    );
  }
}

RelatedArticles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
};

RelatedArticles.defaultProps = {
  articles: [],
};

export default RelatedArticles;
