import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import ProtectedPage from '../../_protected';
import Error from '../../_error';

import Wrapper from '../../../components/Wrapper';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/Footer';

import PageForm from '../../../components/admin/PageForm';

import API from '../../../services/api';
import { getAllCookies } from '../../../services/cookies';

class EditPagePage extends ProtectedPage {
  static async getInitialProps({ req, res, query, pathname }) {
    const cookies = getAllCookies(req);
    const parentProps = await super.getInitialProps({ req, res });
    const page = await API.pages.findOne(query.path, {}, cookies);

    return {
      ...parentProps,
      page,
      pathname,
    };
  }

  constructor(props) {
    super(props);

    this.state = { formDisabled: false };

    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async update(page) {
    this.setState({ formDisabled: true });

    try {
      const savedPage = await API.pages.update(this.props.page.path, page, getAllCookies());

      this.setState({ formDisabled: false });

      Router.push(`/admin/pages/edit?path=${savedPage.path}`, `/admin/pages/${savedPage.path}/edit`);
    } catch (error) {
      this.setState({ formDisabled: false });
    }
  }

  async remove() {
    API.pages.remove(this.props.page.path, getAllCookies())
      .then(() => Router.push('/admin/'));
  }

  render() {
    const {
      page,
      error,
      pathname,
    } = this.props;

    if (error) {
      return <Error statusCode={error.status} />;
    }

    return (
      <Wrapper pathname={pathname}>
        <Head>
          <title>Редагувати сторінку / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <PageForm
            page={page}
            key={page.path}
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

export default EditPagePage;
