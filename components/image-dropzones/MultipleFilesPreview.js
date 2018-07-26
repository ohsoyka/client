import React from 'react';
import PropTypes from 'prop-types';
import { prettifyBytes } from '../../services/text';
import Button from '../ui/Button';

class MultipleFilesPreview extends React.Component {
  render() {
    const { name, preview, size } = this.props.file;
    const isTrueFile = global.File && this.props.file instanceof File;

    return (
      <div className="image-dropzone-preview image-dropzone-preview-multiple" onClick={event => event.stopPropagation()}>
        <div className="image-dropzone-preview-inner aspect-ratio-1-1" style={{ backgroundImage: `url(${preview})` }}>
          <div className="image-dropzone-preview-mask">
            <div className="image-dropzone-preview-content">
              { isTrueFile && <div className="image-dropzone-preview-name">{name}</div>}
              { isTrueFile && <div className="smaller">{prettifyBytes(size)}</div> }
              <div className="layout-row layout-align-center-center margin-top children-horizontal-padding smaller" ref={this.buttons}>
                <Button color="red" onClick={() => this.props.onRemove(this.props.file)}>
                  Видалити
                </Button>
              </div>
            </div>
            <div className="image-dropzone-preview-mask-background" />
          </div>
        </div>
      </div>
    );
  }
}

MultipleFilesPreview.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    preview: PropTypes.string,
    size: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
};

MultipleFilesPreview.defaultProps = {
  onRemove: () => {},
};

export default MultipleFilesPreview;
