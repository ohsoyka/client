import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { current } from '../../config';

import ImageDropzone from '../ImageDropzone';
import Popup from '../Popup';
import PrettifyableInput from '../PrettifyableInput';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import ProgressBar from '../ui/ProgressBar';
import FormWithAutosave from './FormWithAutosave';

const ImageDropzoneWithPreview = ImageDropzone();

class PhotoAlbumForm extends FormWithAutosave {
  constructor(props) {
    super(props);

    this.state = { ...props.photoAlbum };
    this.state.removePopupVisible = false;
    this.state.autosaveId = props.photoAlbum.id || 'new-photo-album';

    this.generatePhotoAlbumLink = this.generatePhotoAlbumLink.bind(this);
    this.updatePhotos = this.updatePhotos.bind(this);
    this.submit = this.submit.bind(this);
  }

  generatePhotoAlbumLink() {
    const prefix = `${current.clientURL}/photography`;
    const path = this.state.path || '';
    const fullLink = `${prefix}/${path}`;

    return <Link as={`/photography/${path}`} href={`/photo-album?path=${path}`}><a>{fullLink}</a></Link>;
  }

  updatePhotos(images) {
    const currentPhotos = this.props.photoAlbum.photos || [];
    const currentImageIds = currentPhotos.map(photo => photo.image.id);

    const newPhotos = images.map((image) => {
      if (currentImageIds.includes(image.id)) {
        return currentPhotos.find(photo => photo.image.id === image.id);
      }

      return { image };
    });

    this.setState({ photos: newPhotos });
  }

  async submit() {
    if (!this.state.title) {
      // TODO: show error popup

      return;
    }

    try {
      await this.props.onSubmit(this.state);
      this.clearAutosavedData();
    } catch (error) {
      console.error(error);
    }
  }

  componentWillReceiveProps({ photoAlbum }) {
    const { cover } = photoAlbum;

    if (this.state.cover instanceof global.File && cover && cover.id) {
      this.setState({ cover });
    }
  }

  render() {
    const {
      photoAlbum,
      disabled,
      loading,
      uploadProgress,
    } = this.props;
    const { photos = [] } = photoAlbum;
    const formTitle = photoAlbum.path ? 'Редагувати фотоальбом' : 'Новий фотоальбом';
    const link = this.generatePhotoAlbumLink();

    return (
      <div className="photo-album-form">
        <h2>{formTitle}</h2>
        <div className="children-vertical-padding layout-row layout-wrap">
          <PrettifyableInput
            label="Назва"
            value={this.state.title}
            disabled={disabled}
            onChange={title => this.updateFormData({ title })}
            className="flex-100"
          />
          <div className="layout-row layout-align-start-center flex-100">
            <Input
              compact
              label="Адреса (латинські букви, цифри, дефіси)"
              value={this.state.path}
              disabled={disabled}
              onChange={path => this.updateFormData({ path })}
              pattern="^[a-z0-9][a-z0-9-]*[a-z0-9]$"
              className="flex-50"
            />
            <div className="nowrap text-overflow-ellipsis margin-left flex-50">
              {link}
            </div>
          </div>
          <PrettifyableInput
            label="Короткий опис"
            value={this.state.description}
            disabled={disabled}
            onChange={description => this.updateFormData({ description })}
            className="flex-100"
          />
          <div className="flex-100">
            <div className="margin-bottom-small">Обкладинка</div>
            <ImageDropzoneWithPreview
              images={[photoAlbum.cover]}
              limit={1}
              loading={loading}
              disabled={disabled}
              onChange={([cover]) => this.setState({ cover })}
              className="flex-100"
            />
          </div>
          <div className="flex-100">
            <div className="margin-bottom-small">Фотографії</div>
            <ImageDropzoneWithPreview
              images={photos.map(photo => photo.image)}
              sortable
              loading={loading}
              disabled={disabled}
              onChange={images => this.updatePhotos(images)}
              className="flex-100"
            />
          </div>
          <div className="flex-100 layout-row layout-align-space-between-center">
            <div className="flex-70 layout-row layout-align-start-center">
              {
                this.props.photoAlbum.id &&
                <Button disabled={disabled} onClick={() => this.setState({ removePopupVisible: true })} color="red" className="margin-right">
                  Видалити
                </Button>
              }
              {
                uploadProgress &&
                <ProgressBar {...uploadProgress} className="flex-100" />
              }
            </div>
            <div className="layout-row layout-align-start-center flex-30 margin-left">
              <Checkbox
                label="Заховати"
                checked={this.state.private}
                disabled={disabled}
                onChange={hidden => this.updateFormData({ private: hidden })}
              />
              <Button disabled={disabled} onClick={this.submit} className="flex-100 margin-left">Зберегти</Button>
            </div>
          </div>
        </div>
        <Popup visible={this.state.removePopupVisible}>
          <p>Точно видалити цей фотоальбом?</p>
          <div className="layout-row">
            <Button onClick={() => this.setState({ removePopupVisible: false })} color="black">Скасувати</Button>
            <Button onClick={this.props.onRemove} color="red" className="margin-left">Видалити</Button>
          </div>
        </Popup>
      </div>
    );
  }
}

PhotoAlbumForm.propTypes = {
  photoAlbum: PropTypes.shape({
    id: PropTypes.string,
    path: PropTypes.string,
    cover: PropTypes.object,
    photos: PropTypes.arrayOf(PropTypes.object),
  }),
  uploadProgress: PropTypes.shape({
    percent: PropTypes.number,
    processedItems: PropTypes.number,
    totalItems: PropTypes.number,
  }),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};

PhotoAlbumForm.defaultProps = {
  photoAlbum: {},
  disabled: false,
  loading: false,
  onRemove: null,
};

export default PhotoAlbumForm;
