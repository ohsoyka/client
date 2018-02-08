import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    label,
    compact,
    lite,
    multiline,
    rows,
    type,
    value,
    pattern,
    className,
    nativeElementClassName,
    onChange,
  } = props;

  const classList = ['input', className];
  const placeholder = compact ? label : props.placeholder;

  if (lite) {
    classList.push('input-lite');
  }

  if (multiline) {
    classList.push('input-multiline');

    return (
      <div className={classList.join(' ')}>
        {!compact && <span className="input-label">{label}</span>}
        <textarea
          placeholder={placeholder}
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
        placeholder={placeholder}
        value={value}
        pattern={pattern}
        onChange={event => onChange(event.target.value)}
        className={`input-element ${nativeElementClassName}`}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  nativeElementClassName: PropTypes.string,
  compact: PropTypes.bool,
  lite: PropTypes.bool,
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
  rows: 3,
};

export default Input;
