import React from 'react';
import PropTypes from 'prop-types';
import Header from './article/Header';
import Footer from './article/Footer';

class Article extends React.Component {
  componentDidMount() {
    window.balanceText('blockquote');
  }

  render() {
    const intro = this.props.intro || (this.props.projectDescriptionAsIntro && this.props.project)
      ? this.props.project.description
      : null;

    return (
      <article className="article">
        <Header image={this.props.featuredImage} title={this.props.title} />
        {intro && <div className="article-intro balance-text">{intro}</div>}
        <div className="article-body" dangerouslySetInnerHTML={{ __html: this.props.body }} />
        <Footer date={this.props.publishedAt} tags={this.props.tags} project={this.props.project} />
      </article>
    );
  }
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
  intro: PropTypes.string,
  projectDescriptionAsIntro: PropTypes.bool,
  body: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),

  project: PropTypes.shape({
    description: PropTypes.string,
  }),
};

Article.defaultProps = {
  intro: '',
  projectDescriptionAsIntro: false,
  tags: [],
  project: null,
};

export default Article;
