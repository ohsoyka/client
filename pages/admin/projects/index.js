import React from 'react';
import Head from 'next/head';

import ProtectedPage from '../../_protected';
import Error from '../../_error';

import Wrapper from '../../../components/Wrapper';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/Footer';

import Button from '../../../components/ui/Button';
import PanelSection from '../../../components/admin/PanelSection';
import PanelSectionItem from '../../../components/admin/PanelSectionItem';

import API from '../../../services/api';
import { getAllCookies } from '../../../services/cookies';

class ProjectsPage extends ProtectedPage {
  static async getInitialProps({ req, res, query }) {
    const cookies = getAllCookies(req);
    const parentProps = await super.getInitialProps({ req, res });
    const projects = await API.projects.find({ sort: '-createdAt', ...query }, cookies);
    return {
      ...parentProps,
      projects: projects.docs,
    };
  }

  render() {
    const { projects, error } = this.props;

    if (error) {
      return <Error error={this.props.error} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Проекти / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <div className="layout-row layout-align-space-between-center">
            <h2>Проекти</h2>
            <Button color="black" href="/admin/projects/new">Новий проект</Button>
          </div>
          <PanelSection className="flex-100">
            {projects.map(project => <PanelSectionItem {...project} type="project" />)}
          </PanelSection>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default ProjectsPage;
