import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import ProtectedPage from '../../_protected';
import Error from '../../_error';

import Wrapper from '../../../components/Wrapper';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/Footer';

import ProjectForm from '../../../components/admin/ProjectForm';

import API from '../../../services/api';
import { getAllCookies } from '../../../services/cookies';

class NewProjectPage extends ProtectedPage {
  static async getInitialProps({ req, res }) {
    const parentProps = await super.getInitialProps({ req, res });

    return {
      ...parentProps,
    };
  }

  static async submit(project) {
    const imageFile = project.image;
    let savedProject;

    if (imageFile) {
      const [uploadedImage] = await API.upload(imageFile, getAllCookies());
      const projectWithImage = Object.assign({}, project, { image: uploadedImage.id });

      savedProject = await API.projects.create(projectWithImage, getAllCookies());
    } else {
      savedProject = await API.projects.create(project, getAllCookies());
    }

    Router.push(`/admin/projects/edit?path=${savedProject.path}`, `/admin/projects/${savedProject.path}/edit`);
  }

  render() {
    const { error } = this.props;

    if (error) {
      return <Error statusCode={this.props.error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Новий проект / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <ProjectForm onSubmit={NewProjectPage.submit} />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default NewProjectPage;
