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

class NewPagePage extends ProtectedPage {
  static async getInitialProps({ req, res }) {
    const parentProps = await super.getInitialProps({ req, res });

    return {
      ...parentProps,
    };
  }

  static async submit(page) {
    const savedPage = await API.pages.create(page, getAllCookies());

    Router.push(`/admin/pages/edit?path=${savedPage.path}`, `/admin/pages/${savedPage.path}/edit`);
  }

  render() {
    const { error } = this.props;

    if (error) {
      return <Error statusCode={this.props.error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Нова сторінка / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <PageForm onSubmit={NewPagePage.submit} />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default NewPagePage;
