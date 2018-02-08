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

class EditProjectPage extends ProtectedPage {
  static async getInitialProps({ req, res, query }) {
    const parentProps = await super.getInitialProps({ req, res });
    const project = await API.projects.findOne(query.path, { include: 'image' }, getAllCookies(req));

    return {
      ...parentProps,
      project,
    };
  }

  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async update(project) {
    const shouldUploadImage = project.image instanceof window.File;
    let image = (project.image && project.image.id) || project.image;

    if (shouldUploadImage) {
      const [uploadedImage] = await API.upload(project.image, getAllCookies());

      image = uploadedImage.id;
    }

    const projectWithImage = Object.assign({}, project, { image });
    const savedProject = await API.projects.update(this.props.project.path, projectWithImage, getAllCookies());

    if (this.props.project.path !== savedProject.path) {
      Router.push(`/admin/projects/edit?path=${savedProject.path}`, `/admin/projects/${savedProject.path}/edit`);
    }
  }

  async remove() {
    API.projects.remove(this.props.project.path, getAllCookies())
      .then(() => Router.push('/admin/'));
  }

  render() {
    const {
      project,
      error,
    } = this.props;

    if (error) {
      return <Error statusCode={this.props.error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Редагувати проект / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <ProjectForm
            project={project}
            key={project.path}
            onSubmit={this.update}
            onRemove={this.remove}
          />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default EditProjectPage;
