import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Error from './_error';
import { current } from '../config';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import ProjectPreview from '../components/ProjectPreview';
import Footer from '../components/Footer';

import API from '../services/api';
import { getAllCookies } from '../services/cookies';

class ProjectsPage extends React.Component {
  static async getInitialProps({ req }) {
    try {
      const { docs } = await API.projects.find({ include: 'image' }, getAllCookies(req));

      return { projects: docs };
    } catch (error) {
      return { error };
    }
  }

  render() {
    if (this.props.error) {
      return <Error statusCode={this.props.error.status} />;
    }

    const { projects } = this.props;
    const title = `Проекти / ${current.meta.title}`;

    return (
      <Wrapper>
        <Head>
          <title>{title}</title>
          <meta name="description" content={current.meta.description} key="description" />
          <meta name="keywords" content={current.meta.keywords.join(', ')} key="keywords" />
        </Head>
        <Header />
        <Content className="container">
          <h1>Проекти</h1>
          {
            projects.map(project => <ProjectPreview key={project.id} {...project} large />)
          }
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

ProjectsPage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};

ProjectsPage.defaultProps = {
  projects: [],
  error: null,
};

export default ProjectsPage;
