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
import Footer from '../components/Footer';

import ArticlePreview from '../components/ArticlePreview';
import ProjectPreview from '../components/ProjectPreview';
import CategoryPreview from '../components/CategoryPreview';
import Carousel from '../components/Carousel';
import ArticlesGroup from '../components/ArticlesGroup';

import API from '../services/api';
import { getAllCookies } from '../services/cookies';

class IndexPage extends AuthenticatablePage {
  static async getInitialProps({ req }) {
    try {
      const parentProps = await super.getInitialProps({ req });
      const lastArticles = await API.articles.find({
        private: false,
        page: 1,
        limit: 7,
        include: 'image',
        sort: '-publishedAt',
      }, getAllCookies(req));
      const mostPopularArticles = await API.articles.find({
        private: false,
        page: 1,
        limit: 7,
        sort: '-views',
        include: 'image',
      }, getAllCookies(req));
      const projects = await API.projects.find({
        private: false,
        include: 'image',
        page: 1,
        limit: 3,
        sort: '-createdAt',
      }, getAllCookies(req));
      const categories = await API.categories.find({
        private: false,
        include: 'image',
        page: 1,
        limit: 4,
      }, getAllCookies(req));

      return {
        ...parentProps,
        lastArticles: lastArticles.docs,
        mostPopularArticles: mostPopularArticles.docs,
        projects: projects.docs,
        categories: categories.docs,
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
      title,
      description,
      keywords,
      language,
      social,
    } = current.meta;


    const {
      lastArticles,
      mostPopularArticles,
      projects,
      categories,
    } = this.props;

    return (
      <Wrapper>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} key="description" />
          <meta name="keywords" content={keywords.join(', ')} key="keywords" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:site" content={social.twitter.username} />
          <meta name="twitter:creator" content={social.twitter.username} />

          <meta name="og:title" content={title} />
          <meta name="og:description" content={description} />
          <meta name="og:url" content={current.clientURL} />
          <meta name="og:site_name" content={title} />
          <meta name="og:locale" content={language} />
          <meta name="og:type" content="website" />
        </Head>
        <Header />
        <Content>
          <Carousel fullScreen autoplaySpeed={10000} pauseOnHover={false}>
            {
              lastArticles.slice(0, 5).map((article, index) => <div data-index={index}><ArticlePreview key={article.id} {...article} fullScreen /></div>)
            }
          </Carousel>
          <div className="container">
            <div className="most-interesting-articles-section">
              <h2>Найцікавіше</h2>
              <ArticlesGroup articles={mostPopularArticles} articlesCount={{ xs: 5 }} />
              <p className="text-right larger"><Link href="/articles"><a>Всі статті &rarr;</a></Link></p>
            </div>

            <div className="projects-section">
              <h2>Проекти</h2>
              {
                projects.map(project => <ProjectPreview key={project.id} {...project} />)
              }
              <p className="text-right larger"><Link href="/projects"><a>Всі проекти &rarr;</a></Link></p>
            </div>

            <div className="categories-section">
              <h2>Категорії</h2>
              <div className="categories-wrapper children-horizontal-padding children-vertical-padding layout-row layout-wrap">
                {
                  categories.map((category, index) => {
                    const classList = ['flex-50', 'flex-gt-xs-33', 'flex-gt-sm-25'];

                    if (index > 1) {
                      classList.push('hide-xs');
                    }

                    if (index > 2) {
                      classList.push('hide-sm');
                    }

                    return <CategoryPreview key={category.id} {...category} className={classList.join(' ')} />;
                  })
                }
              </div>
              <p className="text-right larger"><Link href="/categories"><a>Всі категорії &rarr;</a></Link></p>
            </div>

            <div className="last-articles-section">
              <h2>Останні статті</h2>
              <ArticlesGroup articles={lastArticles} articlesCount={{ xs: 5 }} />
              <p className="text-right larger"><Link href="/articles"><a>Всі статті &rarr;</a></Link></p>
            </div>
          </div>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

IndexPage.propTypes = {
  lastArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
  mostPopularArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};

IndexPage.defaultProps = {
  error: null,
};

export default IndexPage;
