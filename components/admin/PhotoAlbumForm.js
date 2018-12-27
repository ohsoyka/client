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
import Select from '../ui/Select';
import ProgressBar from '../ui/ProgressBar';
import FormWithAutosave from './FormWithAutosave';

const ImageDropzoneWithPreview = ImageDropzone();

class PhotoAlbumForm extends FormWithAutosave {
  constructor(props) {
    super(props);

    const imageSizes = [
      {
        value: 'original',
        label: 'Оригінальний',
      },
      {
        value: 'large',
        label: 'Великий (1920px)',
      },
      {
        value: 'medium',
        label: 'Середній (1280px)',
      },
      {
        value: 'small',
        label: 'Маленький (800px)',
      },
    ];

    this.state = {
      ...props.photoAlbum,
      imageSizes,
      sizeToDownload: imageSizes.find(size => size.value === 'original'),
    };
    this.state.removePopupVisible = false;
    this.state.autosaveId = props.photoAlbum.id || 'new-photo-album';

    this.generatePhotoAlbumLink = this.generatePhotoAlbumLink.bind(this);
    this.generateDownloadLink = this.generateDownloadLink.bind(this);
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

  generateDownloadLink(size = 'original') {
    const { path } = this.props.photoAlbum;

    return `${current.apiURL}/photo-albums/${path}/download?size=${size}`;
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
          <div className="layout-row layout-align-space-between-center flex-100">
            <div className="layout-row layout-align-start-center flex-100">
              {
                this.props.photoAlbum.id &&
                <Button
                  disabled={disabled}
                  onClick={() => this.setState({ removePopupVisible: true })}
                  color="red"
                  icon="fas fa-trash-alt"
                  className="margin-right"
                >
                  Видалити
                </Button>
              }
              {
                uploadProgress &&
                <ProgressBar {...uploadProgress} className="flex-100" />
              }
            </div>
            <div className="layout-row layout-align-start-center margin-left">
              <Checkbox
                label="Заховати"
                checked={this.state.hidden}
                disabled={disabled}
                onChange={hidden => this.updateFormData({ hidden })}
              />
              <Button
                disabled={disabled}
                onClick={this.submit}
                icon="fas fa-save"
                className="margin-left"
              >
                Зберегти
              </Button>
            </div>
          </div>
        </div>

        {
          this.props.photoAlbum.path &&
          (
            <div>
              <h2>Завантажити фото з альбому</h2>
              <div className="layout-row layout-wrap children-vertical-padding">
                <div className="layout-row flex-100">
                  <Select
                    label="Розмір фотографій"
                    value={this.state.sizeToDownload}
                    options={this.state.imageSizes}
                    disabled={disabled}
                    onChange={newSizeToDownload => this.setState({
                      sizeToDownload: this.state.imageSizes.find(size => size.value === newSizeToDownload),
                    })}
                    className="flex-70 flex-gt-xs-50"
                  />
                </div>
                <Button
                  icon="fas fa-download"
                  disabled={disabled}
                  href={this.generateDownloadLink(this.state.sizeToDownload.value)}
                >
                  Завантажити
                </Button>
              </div>
            </div>
          )
        }

        <Popup title="Точно видалити цей фотоальбом?" visible={this.state.removePopupVisible}>
          <div className="layout-row layout-align-end-center">
            <Button onClick={() => this.setState({ removePopupVisible: false })} color="black">Скасувати</Button>
            <Button onClick={this.props.onRemove} color="red" icon="fas fa-trash-alt" className="margin-left">Видалити</Button>
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
  downloadLink: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};

PhotoAlbumForm.defaultProps = {
  photoAlbum: {},
  disabled: false,
  loading: false,
  downloadLink: '',
  onRemove: null,
};

export default PhotoAlbumForm;
