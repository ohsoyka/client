import React from 'react';
import PropTypes from 'prop-types';
import Input from './ui/Input';

const PrettifyableInput = (props) => {
  const {
    label,
    placeholder,
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
    onEnter,
  } = props;

  return (
    <div className={`prettifyable-input ${className}`}>
      <Input
        label={label}
        placeholder={placeholder}
        compact={compact}
        lite={lite}
        multiline={multiline}
        disabled={disabled}
        rows={rows}
        type={type}
        value={value}
        pattern={pattern}
        nativeElementClassName={nativeElementClassName}
        onChange={onChange}
        onEnter={onEnter}
      >
        <div
          title="Зробити гарно"
          className="prettifyable-input-prettify-button fa fa-wrench"
          onClick={() => PrettifyableInput.prettify(props)}
        />
      </Input>
    </div>
  );
};

PrettifyableInput.prettify = function ({ value, onChange }) {
  const prettifiedValue = global.LinaKostenko(value, { output: 'text' });

  onChange(prettifiedValue);
};

PrettifyableInput.propTypes = {
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

PrettifyableInput.defaultProps = {
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

export default PrettifyableInput;
