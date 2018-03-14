import React from 'react';
import PropTypes from 'prop-types';
import Header from './article/Header';
import Footer from './article/Footer';

import prepareHTMLBeforePresenting from '../helpers/prepare-html-before-presenting';

class Article extends React.Component {
  componentDidMount() {
    window.balanceText('blockquote');
  }

  render() {
    const intro = (this.props.projectDescriptionAsIntro && this.props.project
      ? this.props.project.description
      : null) || this.props.intro;
    const introClassNames = ['article-intro'];

    if (intro.length < 300) {
      introClassNames.push('text-center', 'balance-text');
    }

    const body = prepareHTMLBeforePresenting(this.props.body);

    return (
      <article className="article">
        <Header image={this.props.image} title={this.props.title} />
        {intro && <div className={introClassNames.join(' ')}>{intro}</div>}
        <div className="article-body" dangerouslySetInnerHTML={{ __html: body }} />
        <Footer date={this.props.publishedAt} tags={this.props.tags} project={this.props.project} />
      </article>
    );
  }
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    original: PropTypes.string,
    large: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
    averageColor: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
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
