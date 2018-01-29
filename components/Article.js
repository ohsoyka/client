import React from 'react';
import PropTypes from 'prop-types';
import Header from './article/Header';
import Footer from './article/Footer';

const Article = props => (
  <article className="article">
    <Header image={props.featuredImage} title={props.title} />
    {props.intro && <div className="article-intro">{props.intro}</div>}
    <div className="article-body" dangerouslySetInnerHTML={{ __html: props.body }} />
    <Footer date={props.publishedAt} tags={props.tags} />
  </article>
);

Article.propTypes = {
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
  intro: PropTypes.string,
  body: PropTypes.string.isRequired,
  publishedAt: PropTypes.instanceOf(Date).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

Article.defaultProps = {
  intro: '',
  tags: [],
};

export default Article;
