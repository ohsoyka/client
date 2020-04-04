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

import ArticlesGroup from '../components/ArticlesGroup';
import Project from '../components/Project';

import API from '../services/api';
import { getAllCookies } from '../services/cookies';

class ProjectPage extends AuthenticatablePage {
  static async getInitialProps({ req, pathname, query }) {
    try {
      const cookies = getAllCookies(req);
      const parentProps = await super.getInitialProps({ req });
      const project = await API.projects.findOne(query.path, { include: 'image' }, cookies);
      const { docs } = await API.articles.find({ project: project.id, include: 'image' }, cookies);

      return {
        ...parentProps,
        project,
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
      project,
      articles,
      pathname,
    } = this.props;
    const title = `Проект «${project.title}» / ${current.meta.title}`;
    const { description, image } = project;
    const url = `${current.clientURL}/projects/${project.path}`;

    const articlesSectionTitle = articles.length ? <h2>У цьому проекті:</h2> : <h2 className="text-center">Поки що тут порожньо</h2>;

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
          <Project key={project.id} {...project} />

          {articlesSectionTitle}
          <div className="project-articles">
            {
              <ArticlesGroup
                key={articles.map(relatedArticle => relatedArticle.id).join(' ')}
                articles={articles}
              />
            }
          </div>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

ProjectPage.propTypes = {
  project: PropTypes.shape({}).isRequired,
  articles: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};

ProjectPage.defaultProps = {
  articles: [],
  error: null,
};

export default ProjectPage;
