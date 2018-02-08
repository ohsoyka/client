import React from 'react';
import Head from 'next/head';

import ProtectedPage from '../../_protected';
import Error from '../../_error';

import Wrapper from '../../../components/Wrapper';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/Footer';

import PanelSection from '../../../components/admin/PanelSection';
import PanelSectionItem from '../../../components/admin/PanelSectionItem';

import API from '../../../services/api';
import { getAllCookies } from '../../../services/cookies';

class ProjectsPage extends ProtectedPage {
  static async getInitialProps({ req, res, query }) {
    const parentProps = await super.getInitialProps({ req, res });
    const projects = await API.projects.find(Object.assign({
      sort: '-createdAt',
    }, query), getAllCookies(req));
    return {
      ...parentProps,
      projects: projects.docs,
    };
  }

  render() {
    const { projects, error } = this.props;

    if (error) {
      return <Error statusCode={this.props.error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Проекти / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <h2>Проекти</h2>
          <PanelSection type="projects" className="flex-100">
            {projects.map(article => <PanelSectionItem {...article} type="article" />)}
          </PanelSection>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default ProjectsPage;
