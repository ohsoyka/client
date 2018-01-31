import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Error from './_error';
import { current } from '../config';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import Article from '../components/Article';
import ArticlesGroup from '../components/ArticlesGroup';
import Footer from '../components/Footer';

import Data from '../services/data';
import * as Text from '../services/text';

class ArticlePage extends React.Component {
  static getInitialProps({ query }) {
    try {
      const article = Data.articles.find(_article => _article.path === query.path);
      const project = article.project ? Data.projects.find(_project => _project.id === article.project) : null;
      const category = article.category ? Data.categories.find(_category => _category.id === article.category) : null;
      const relatedArticles = project
        ? Data.articles.filter(_article => _article.project === project.id)
          .filter(_article => _article.id !== article.id)
        : Data.articles.filter(_article => _article.category === category.id)
          .filter(_article => _article.id !== article.id);

      return {
        article,
        relatedArticles,
        project,
        category,
      };
    } catch (error) {
      return { error };
    }
  }

  render() {
    if (this.props.error) {
      return <Error statusCode={this.props.error.status} />;
    }

    const {
      article,
      relatedArticles,
      project,
      category,
    } = this.props;
    const title = `${article.title} / ${current.meta.title}`;
    const description = Text.stripHTML(Text.shorten(article.body, 60));
    const image = article.featuredImage;
    const url = `${current.clientURL}/${article.path}`;

    const relatedArticlesTitle = project
      ? (<span>Інше з проекту:</span>)
      : (
        <span>
          Інше з категорії <Link href={`/category?path=${category.path}`} as={`/categories/${category.path}`}><a>«{category.title}»</a></Link>
        </span>
      );

    return (
      <Wrapper>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} key="description" />
          <meta name="keywords" content={article.tags.join(', ')} key="keywords" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:site" content={current.meta.social.twitter.username} />
          <meta name="twitter:creator" content={current.meta.social.twitter.username} />
          <meta name="twitter:image:src" content={image} />

          <meta name="og:title" content={title} />
          <meta name="og:description" content={description} />
          <meta name="og:image" content={image} />
          <meta name="og:url" content={url} />
          <meta name="og:site_name" content={current.meta.title} />
          <meta name="og:locale" content={current.meta.language} />
          <meta name="og:type" content="website" />
        </Head>
        <Header />
        <Content className="container">
          <Article key={article.id} {...article} project={project} />

          {
            Boolean(relatedArticles.length) && (
              <div className="related-articles-section">
                <h2>{relatedArticlesTitle}</h2>
                <ArticlesGroup
                  key={relatedArticles.map(relatedArticle => relatedArticle.id).join(' ')}
                  articles={relatedArticles}
                  articlesCount={{ xs: 3 }}
                />
              </div>
            )
          }
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

ArticlePage.propTypes = {
  article: PropTypes.shape({}).isRequired,
  relatedArticles: PropTypes.arrayOf(PropTypes.object),
  project: PropTypes.shape({}),
  category: PropTypes.shape({}),
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};

ArticlePage.defaultProps = {
  relatedArticles: [],
  project: null,
  category: null,
  error: null,
};

export default ArticlePage;
