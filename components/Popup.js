import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../public/static/icons/remove.svg';

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
    };

    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ visible: props.visible });
  }

  close() {
    this.setState({ visible: false });
  }

  render() {
    const { title, children } = this.props;
    const visibilityClassName = this.state.visible ? 'popup-wrapper-visible' : '';

    return (
      <div className={`popup-wrapper ${visibilityClassName}`}>
        <div className="popup">
          <div className="popup-header">
            <div className="popup-title">{title}</div>
            <button className="popup-close-button" onClick={this.close}><CloseIcon /></button>
          </div>
          {children}
        </div>
        <div className="popup-shadow" onClick={this.close} />
      </div>
    );
  }
}

Popup.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
};

Popup.defaultProps = {
  title: '',
  visible: false,
};

export default Popup;
