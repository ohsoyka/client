import React from 'react';
import PropTypes from 'prop-types';
import ReactDropzone from 'react-dropzone';
import LoaderIcon from '../static/icons/oval.svg';

class Dropzone extends React.Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    const currentFiles = this.props.files.filter(file => file && file.name);
    const newFiles = files.filter(file => !currentFiles.some(currentFile =>
      file.name === currentFile.name && file.size === currentFile.size && file.type === currentFile.type));
    const updatedFilesList = [...currentFiles, ...newFiles].slice(-this.props.limit);

    this.props.onDrop(updatedFilesList);
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

    if (disabled) {
      classList.push('dropzone-disabled');
    }

    return (
      <ReactDropzone
        onDrop={this.onDrop}
        accept={this.props.accept}
        className={classList.join(' ')}
        activeClassName="dropzone-active"
        acceptClassName="dropzone-accept"
        rejectClassName="dropzone-reject"
        disablePreview
        disabled={loading || disabled}
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
            {fileList.map(file => <div key={file.name}>{file.name}</div>)}
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
  onDrop: PropTypes.func.isRequired,
  accept: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  height: PropTypes.string,
};

Dropzone.defaultProps = {
  files: [],
  limit: 0,
  placeholder: 'Клацни або перетягни сюди файл',
  accept: null,
  className: '',
  loading: false,
  disabled: false,
  height: 'auto',
};

export default Dropzone;
