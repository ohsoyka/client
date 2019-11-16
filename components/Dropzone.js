import React from 'react';
import PropTypes from 'prop-types';
import ReactDropzone from 'react-dropzone';
import LoaderIcon from '../public/static/icons/oval.svg';

const DefaultFilePreview = ({ file }) => <div key={file.name}>{file.name}</div>;

DefaultFilePreview.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default function (FilePreview = DefaultFilePreview) {
  class Dropzone extends React.Component {
    constructor(props) {
      super(props);

      this.onChange = this.onChange.bind(this);

      this.dropzone = React.createRef();
    }

    onChange(files) {
      const currentFiles = this.props.files.filter(file => file && file.name);
      const newFiles = files.filter(file => !currentFiles.some(currentFile =>
        file.name === currentFile.name && file.size === currentFile.size && file.type === currentFile.type));
      const updatedFilesList = [...currentFiles, ...newFiles].slice(-this.props.limit);

      this.props.onChange(updatedFilesList);
    }

    onRemove(fileToRemove) {
      const currentFiles = this.props.files.filter(file => file && file.name);
      const indexOfFileToRemove = currentFiles.indexOf(fileToRemove);
      const updatedFilesList = currentFiles.slice(0, indexOfFileToRemove)
        .concat(currentFiles.slice(indexOfFileToRemove + 1));

      this.props.onChange(updatedFilesList);
    }

    render() {
      const {
        files,
        loading,
        disabled,
      } = this.props;
      const fileList = files.filter(file => file && file.name);
      const placeholderVisible = !fileList.length;
      const classList = ['dropzone', this.props.className];
      const disablePreview = FilePreview === DefaultFilePreview;

      if (disabled) {
        classList.push('dropzone-disabled');
      }

      return (
        <ReactDropzone
          onDrop={this.onChange}
          ref={this.dropzone}
          accept={this.props.accept}
          className={classList.join(' ')}
          activeClassName="dropzone-active"
          acceptClassName="dropzone-accept"
          rejectClassName="dropzone-reject"
          disabled={loading || disabled}
          disablePreview={disablePreview}
          style={{ height: this.props.height }}
        >
          <div className="dropzone-content">
            <div className={`dropzone-loader ${loading ? 'visible' : ''}`}>
              <LoaderIcon className="dropzone-loader-icon" />
            </div>
            <div className={`dropzone-placeholder text-center ${placeholderVisible ? 'visible' : ''}`}>
              {this.props.placeholder}
            </div>
            <div className="dropzone-filelist">
              {fileList.map(file => <FilePreview key={file.name} file={file} onRemove={() => this.onRemove(file)} />)}
            </div>
          </div>
        </ReactDropzone>
      );
    }
  }

  Dropzone.propTypes = {
    files: PropTypes.arrayOf(PropTypes.object),
    limit: PropTypes.number,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    accept: PropTypes.string,
    className: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    height: PropTypes.string,
  };

  Dropzone.defaultProps = {
    files: [],
    limit: Number.POSITIVE_INFINITY,
    placeholder: 'Клацни або перетягни сюди файл',
    accept: null,
    className: '',
    loading: false,
    disabled: false,
    height: 'auto',
  };

  return Dropzone;
}
