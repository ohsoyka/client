import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Error from './_error';
import { current } from '../config';
import AuthenticatablePage from './_authenticatable';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';

import ArticlePreview from '../components/ArticlePreview';
import Category from '../components/Category';

import API from '../services/api';
import { getAllCookies } from '../services/cookies';

class CategoryPage extends AuthenticatablePage {
  static async getInitialProps({ req, query, pathname }) {
    try {
      const cookies = getAllCookies(req);
      const parentProps = await super.getInitialProps({ req });
      const category = await API.categories.findOne(query.path, { include: 'image' }, cookies);
      const { docs } = await API.articles.find({ category: category.id, include: 'image' }, cookies);

      return {
        ...parentProps,
        category,
        articles: docs,
        pathname,
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
      category,
      articles,
      pathname,
    } = this.props;

    const title = `Категорія «${category.title}» / ${current.meta.title}`;
    const { description, image } = category;
    const url = `${current.clientURL}/categories/${category.path}`;

    const articlesSectionTitle = articles.length ? <h2>У цій категорії:</h2> : <h2 className="text-center">Поки що тут порожньо</h2>;

    return (
      <Wrapper pathname={pathname}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} key="description" />

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
          <meta name="og:locale" content={current.meta.languageTerritory} />
          <meta name="og:type" content="website" />
        </Head>
        <Header />
        <Content className="container">
          <Category key={category.id} {...category} />

          {articlesSectionTitle}
          <div className="category-articles">
            {
              articles.map(article => <ArticlePreview large horizontal {...article} key={article.id} />)
            }
          </div>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

CategoryPage.propTypes = {
  category: PropTypes.shape({}).isRequired,
  articles: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
  pathname: PropTypes.string.isRequired,
};

CategoryPage.defaultProps = {
  articles: [],
  error: null,
};

export default CategoryPage;
