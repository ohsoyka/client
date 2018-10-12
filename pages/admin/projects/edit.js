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
  static async getInitialProps({ req, res, query, pathname }) {
    const cookies = getAllCookies(req);
    const parentProps = await super.getInitialProps({ req, res });
    const project = await API.projects.findOne(query.path, { include: 'image' }, cookies);

    return {
      ...parentProps,
      project,
      pathname,
    };
  }

  constructor(props) {
    super(props);

    this.state = { formDisabled: false };

    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async update(project) {
    const cookies = getAllCookies();

    this.setState({ formDisabled: true });

    try {
      const shouldUploadImage = project.image instanceof window.File;
      let image = (project.image && project.image.id) || project.image;

      if (shouldUploadImage) {
        const [uploadedImage] = await API.upload(project.image, cookies);

        image = uploadedImage.id;
      }

      const projectWithImage = { ...project, image };
      const savedProject = await API.projects.update(this.props.project.path, projectWithImage, cookies);

      this.setState({ formDisabled: false });

      Router.push(`/admin/projects/edit?path=${savedProject.path}`, `/admin/projects/${savedProject.path}/edit`);
    } catch (error) {
      this.setState({ formDisabled: false });
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
      pathname,
    } = this.props;

    if (error) {
      return <Error statusCode={error.status} />;
    }

    return (
      <Wrapper pathname={pathname}>
        <Head>
          <title>Редагувати проект / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <ProjectForm
            project={project}
            key={project.path}
            disabled={this.state.formDisabled}
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
