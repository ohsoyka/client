import React from 'react';
import PropTypes from 'prop-types';
import { prettifyBytes } from '../../services/text';
import Button from '../ui/Button';

class SingleFilePreview extends React.Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove(event) {
    event.stopPropagation();
    this.props.onRemove(this.props.file);
  }

  render() {
    const { name, preview, size } = this.props.file;
    const isTrueFile = global.File && this.props.file instanceof File;

    return (
      <div className="image-dropzone-preview image-dropzone-preview-single" key={name}>
        <img alt={name} src={preview} />
        <div className="image-dropzone-preview-mask">
          <div className="image-dropzone-preview-content">
            { isTrueFile && <div className="image-dropzone-preview-name">{name}</div>}
            { isTrueFile && <div className="smaller">{prettifyBytes(size)}</div> }
            <div className="layout-row layout-align-center-center margin-top children-horizontal-padding smaller">
              <Button color="black" icon="fas fa-exchange-alt">
                Замінити
              </Button>
              <Button color="red" onClick={this.remove} icon="fas fa-trash-alt">
                Видалити
              </Button>
            </div>
          </div>
          <div className="image-dropzone-preview-mask-background" />
        </div>
      </div>
    );
  }
}

SingleFilePreview.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    preview: PropTypes.string,
    size: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
};

SingleFilePreview.defaultProps = {
  onRemove: () => {},
};

export default SingleFilePreview;
