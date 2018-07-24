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

class EditPhotoAlbumPage extends ProtectedPage {
  static async getInitialProps({ req, res, query }) {
    const cookies = getAllCookies(req);
    const parentProps = await super.getInitialProps({ req, res });
    const photoAlbum = await API.photoAlbums.findOne(query.path, { include: 'cover, photos, photos.image' }, cookies);

    return {
      ...parentProps,
      photoAlbum,
    };
  }

  constructor(props) {
    super(props);

    this.state = { formDisabled: false };

    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async update(photoAlbum) {
    const cookies = getAllCookies();

    this.setState({ formDisabled: true });

    try {
      const shouldUploadCover = photoAlbum.cover instanceof window.File;
      let cover = (photoAlbum.cover && photoAlbum.cover.id) || photoAlbum.cover;

      if (shouldUploadCover) {
        const [uploadedCover] = await API.upload(photoAlbum.cover, cookies);

        cover = uploadedCover.id;
      }

      const AlbumUploader = PhotoUploader.create(photoAlbum.photos);
      const uploadedPhotos = await AlbumUploader.upload();

      const photoAlbumWithCoverAndPhotos = {
        ...photoAlbum,
        cover,
        photos: uploadedPhotos.map(photo => photo.id),
      };
      const savedPhotoAlbum = await API.photoAlbums
        .update(this.props.photoAlbum.path, photoAlbumWithCoverAndPhotos, cookies);

      this.setState({ formDisabled: false });

      Router.push(`/admin/photo-albums/edit?path=${savedPhotoAlbum.path}`, `/admin/photo-albums/${savedPhotoAlbum.path}/edit`);
    } catch (error) {
      this.setState({ formDisabled: false });
    }
  }

  async remove() {
    API.photoAlbums.remove(this.props.photoAlbum.path, getAllCookies())
      .then(() => Router.push('/admin/'));
  }

  render() {
    const {
      photoAlbum,
      error,
    } = this.props;

    if (error) {
      return <Error statusCode={error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Редагувати фотоальбом / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <PhotoAlbumForm
            photoAlbum={photoAlbum}
            key={photoAlbum.path}
            disabled={this.state.formDisabled}
            loading={this.state.formDisabled}
            onSubmit={this.update}
            onRemove={this.remove}
          />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default EditPhotoAlbumPage;
