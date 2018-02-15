import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.which === 13 && this.props.onEnter) {
      this.props.onEnter();
    }
  }

  render() {
    const {
      label,
      compact,
      lite,
      multiline,
      disabled,
      rows,
      type,
      value,
      pattern,
      className,
      nativeElementClassName,
      onChange,
    } = this.props;

    const classList = ['input', className];
    const placeholder = compact ? label : this.props.placeholder;

    if (lite) {
      classList.push('input-lite');
    }

    if (disabled) {
      classList.push('input-disabled');
    }

    if (multiline) {
      classList.push('input-multiline');

      return (
        <div className={classList.join(' ')}>
          {!compact && <span className="input-label">{label}</span>}
          <textarea
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            rows={rows}
            onChange={event => onChange(event.target.value)}
            className={`input-element ${nativeElementClassName}`}
          />
        </div>
      );
    }

    return (
      <div className={classList.join(' ')}>
        {!compact && <span className="input-label">{label}</span>}
        <input
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          pattern={pattern}
          onChange={event => onChange(event.target.value)}
          onKeyPress={this.handleKeyPress}
          className={`input-element ${nativeElementClassName}`}
        />
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  className: PropTypes.string,
  nativeElementClassName: PropTypes.string,
  compact: PropTypes.bool,
  lite: PropTypes.bool,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  label: '',
  placeholder: '',
  pattern: null,
  className: '',
  nativeElementClassName: '',
  compact: false,
  lite: false,
  multiline: false,
  disabled: false,
  rows: 3,
  onEnter: null,
};

export default Input;
