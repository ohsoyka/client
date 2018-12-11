import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import ProtectedPage from '../../_protected';
import Error from '../../_error';

import Wrapper from '../../../components/Wrapper';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/Footer';

import PhotoAlbumForm from '../../../components/admin/PhotoAlbumForm';

import API from '../../../services/api';
import { getAllCookies } from '../../../services/cookies';
import PhotoUploader from '../../../services/photo-uploader';

class NewPhotoAlbumPage extends ProtectedPage {
  static async getInitialProps({ req, res, pathname }) {
    const parentProps = await super.getInitialProps({ req, res });

    return {
      ...parentProps,
      pathname,
    };
  }

  constructor(props) {
    super(props);

    this.state = { formDisabled: false };

    this.submit = this.submit.bind(this);
  }

  async submit(photoAlbum) {
    const cookies = getAllCookies();

    this.setState({ formDisabled: true });

    try {
      const coverFile = photoAlbum.cover;
      const AlbumUploader = PhotoUploader.create(photoAlbum.photos);

      AlbumUploader.on('progress', ({ percent, uploaded, total }) => {
        this.setState({
          uploadProgress: {
            percent,
            processedItems: uploaded,
            totalItems: total,
          },
        });
      });

      AlbumUploader.on('end', () => this.setState({ uploadProgress: null }));

      const [uploadedCover] = await API.upload(coverFile, cookies);
      const uploadedPhotos = await AlbumUploader.upload();

      const photoAlbumWithCoverAndPhotos = {
        ...photoAlbum,
        cover: uploadedCover.id,
        photos: uploadedPhotos.map(photo => photo.id),
      };

      const savedPhotoAlbum = await API.photoAlbums.create(photoAlbumWithCoverAndPhotos, cookies);

      this.setState({ formDisabled: false });

      Router.push(`/admin/photo-albums/edit?path=${savedPhotoAlbum.path}`, `/admin/photo-albums/${savedPhotoAlbum.path}/edit`);
    } catch (error) {
      console.error(error);
      this.setState({ formDisabled: false });
    }
  }

  render() {
    const { error, pathname } = this.props;

    if (error) {
      return <Error statusCode={error.status} />;
    }

    return (
      <Wrapper pathname={pathname}>
        <Head>
          <title>Новий фотоальбом / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <PhotoAlbumForm
            disabled={this.state.formDisabled}
            loading={this.state.formDisabled}
            uploadProgress={this.state.uploadProgress}
            onSubmit={this.submit}
          />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default NewPhotoAlbumPage;
