import React from 'react';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import Dropzone from './Dropzone';
import SingleFilePreview from './image-dropzones/SingleFilePreview';
import MultipleFilesPreview from './image-dropzones/MultipleFilesPreview';

export default function (FilePreview) {
  class ImageDropzone extends React.Component {
    constructor(props) {
      super(props);

      const PreviewComponent = FilePreview || (props.limit === 1 ? SingleFilePreview : MultipleFilesPreview);
      const DropzoneWithPreview = Dropzone(PreviewComponent);

      const files = props.images
        .filter(image => image)
        .map((image) => {
          if (global.File && image instanceof File) {
            return image;
          }

          return {
            preview: image.small,
            name: image.small,
            id: image.id,
          };
        });

      this.state = {
        files,
        DropzoneWithPreview,
      };

      this.updateFiles = this.updateFiles.bind(this);
      this.initSortable = this.initSortable.bind(this);

      this.wrapperElement = React.createRef();
    }

    componentDidMount() {
      if (this.props.limit > 1 && this.props.sortable) {
        this.initSortable();
      }
    }

    initSortable() {
      const wrapperElement = this.wrapperElement.current;
      const sortableElement = wrapperElement.querySelector('.dropzone-filelist');

      Sortable.create(sortableElement, {
        forceFallback: true,

        onUpdate: (event) => {
          const { oldIndex, newIndex } = event;
          const currentFiles = [...this.state.files];
          const movedItem = currentFiles.splice(oldIndex, 1);
          const reorderedFiles = currentFiles
            .slice(0, newIndex)
            .concat(movedItem)
            .concat(currentFiles.slice(newIndex));

          this.updateFiles(reorderedFiles);
        },
      });
    }

    updateFiles(files) {
      let updatedFilesList = files;

      if (!files.length && this.props.limit === 1) {
        updatedFilesList = [null];
      }

      this.setState({ files: updatedFilesList });
      this.props.onChange(updatedFilesList);
    }

    render() {
      const {
        limit,
        disabled,
        loading,
        placeholder,
        className,
      } = this.props;
      const { DropzoneWithPreview, files } = this.state;

      const classList = ['image-dropzone', className];

      if (disabled) {
        classList.push('image-dropzone-disabled');
      }

      return (
        <div className={classList.join(' ')} ref={this.wrapperElement}>
          <DropzoneWithPreview
            limit={limit}
            files={files}
            placeholder={placeholder}
            disabled={disabled}
            loading={loading}
            onChange={newFiles => this.updateFiles(newFiles)}
            className="image-dropzone-element"
          />
        </div>
      );
    }
  }

  ImageDropzone.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    limit: PropTypes.number,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    sortable: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  ImageDropzone.defaultProps = {
    images: [],
    limit: Number.POSITIVE_INFINITY,
    disabled: false,
    loading: false,
    sortable: false,
    placeholder: 'Клацни або перетягни сюди зображення',
    className: '',
  };

  return ImageDropzone;
}
