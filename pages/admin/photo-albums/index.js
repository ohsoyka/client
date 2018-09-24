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

class PhotoAlbumsPage extends ProtectedPage {
  static async getInitialProps({ req, res, query }) {
    const cookies = getAllCookies(req);
    const parentProps = await super.getInitialProps({ req, res });
    const photoAlbums = await API.photoAlbums.find({ sort: '-createdAt', ...query }, cookies);
    return {
      ...parentProps,
      photoAlbums: photoAlbums.docs,
    };
  }

  render() {
    const { photoAlbums, error } = this.props;

    if (error) {
      return <Error error={this.props.error} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Фотоальбоми / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <div className="layout-row layout-align-space-between-center">
            <h2>Фотоальбоми</h2>
            <Button color="black" href="/admin/photo-albums/new">Новий фотоальбом</Button>
          </div>
          <PanelSection className="flex-100">
            {photoAlbums.map(photoAlbum => <PanelSectionItem {...photoAlbum} type="photo-album" />)}
          </PanelSection>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default PhotoAlbumsPage;
