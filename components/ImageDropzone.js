import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from './Dropzone';
import Button from './ui/Button';

class ImageDropzone extends React.Component {
  constructor(props) {
    super(props);

    this.state = { image: null, imageURL: props.imageURL };

    this.setImage = this.setImage.bind(this);
  }

  setImage(image) {
    const newState = { image };

    if (!image) {
      newState.imageURL = null;
    }

    this.setState(newState);

    this.props.onChange(image);
  }

  render() {
    const {
      disabled,
      className,
    } = this.props;
    const { imageURL } = this.state;
    const classList = ['image-dropzone', className];

    if (disabled) {
      classList.push('image-dropzone-disabled');
    }

    const preview = (
      <div className="image-dropzone-preview">
        <img alt="" src={imageURL} />
        <div className="image-dropzone-preview-mask">
          <Button color="red" onClick={() => this.setImage(null)} className="image-dropzone-preview-remove-button">
            Видалити
          </Button>
          <div className="image-dropzone-preview-mask-background" />
        </div>
      </div>
    );

    return (
      <div className={classList.join(' ')}>
        <Dropzone
          limit={1}
          files={[this.state.image]}
          disabled={disabled}
          onDrop={([image]) => this.setImage(image)}
          className="image-dropzone-element"
        />
        {imageURL && preview}
      </div>
    );
  }
}

ImageDropzone.propTypes = {
  disabled: PropTypes.bool,
  imageURL: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ImageDropzone.defaultProps = {
  disabled: false,
  imageURL: '',
  className: '',
};

export default ImageDropzone;
