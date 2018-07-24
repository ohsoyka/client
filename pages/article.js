import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Error from './_error';
import { current } from '../config';
import AuthenticatablePage from './_authenticatable';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import Article from '../components/Article';
import ArticlesGroup from '../components/ArticlesGroup';
import Footer from '../components/Footer';

import API from '../services/api';
import { getAllCookies } from '../services/cookies';
import * as Text from '../services/text';

class ArticlePage extends AuthenticatablePage {
  static async getInitialProps({ req, query }) {
    try {
      const cookies = getAllCookies(req);
      const parentProps = await super.getInitialProps({ req });
      const article = await API.articles.findOne(query.path, { include: 'image, project, project.image, category' }, cookies);
      let relatedArticles = [];

      if (article.project) {
        const { docs } = await API.articles
          .find({
            project: article.project.id,
            include: 'image, project.image',
            page: 1,
            limit: 3,
          }, cookies);

        relatedArticles = docs;
      } else if (article.category) {
        const { docs } = await API.articles
          .find({
            category: article.category.id,
            include: 'image',
            page: 1,
            limit: 3,
          }, cookies);

        relatedArticles = docs;
      } else {
        const searchQuery = [article.title, article.brief, ...article.tags].join(' ');
        const { docs } = await API.search({ query: searchQuery, include: 'image' }, cookies);

        relatedArticles = docs.filter(searchResult => searchResult.searchResultType === 'article');
      }

      relatedArticles = relatedArticles.filter(relatedArticle => relatedArticle.id !== article.id).slice(0, 3);

      return {
        ...parentProps,
        article,
        relatedArticles,
      };
    } catch (error) {
      return { error };
    }
  }

  render() {
    if (this.props.error) {
      return <Error error={this.props.error} />;
    }

    const {
      article,
      relatedArticles,
    } = this.props;

    const { project, category } = article;
    const image = article.image || {};

    const title = `${article.title} / ${current.meta.title}`;
    const description = Text.stripHTML(Text.shorten(article.body, 60));
    const url = `${current.clientURL}/${article.path}`;

    let relatedArticlesTitle = <span>Схожі статті</span>;

    if (project) {
      relatedArticlesTitle = <span>Інше з проекту</span>;
    } else if (category) {
      relatedArticlesTitle = (
        <span>
          Інше з категорії <Link href={`/category?path=${category.path}`} as={`/categories/${category.path}`}><a>«{category.title}»</a></Link>
        </span>
      );
    }

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
          <meta name="twitter:image:src" content={image.medium} />

          <meta name="og:title" content={title} />
          <meta name="og:description" content={description} />
          <meta name="og:image" content={image.medium} />
          <meta name="og:url" content={url} />
          <meta name="og:site_name" content={current.meta.title} />
          <meta name="og:locale" content={current.meta.language} />
          <meta name="og:type" content="website" />
        </Head>
        <Header />
        <Content className="container">
          <Article key={article.id} {...article} project={project} category={category} />

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
