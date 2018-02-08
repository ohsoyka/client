import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

const Select = props => (
  <div className={`select ${props.className}`}>
    {props.label && <div className="select-label">{props.label}</div>}
    <ReactSelect
      value={props.value}
      clearable={props.clearable}
      disabled={props.disabled}
      options={props.options}
      onChange={option => props.onChange(option && option.value)}
      placeholder={props.placeholder}
      noResultsText="Нічого не знайшлось"
    />
  </div>
);

Select.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

Select.defaultProps = {
  value: null,
  label: '',
  clearable: false,
  disabled: false,
  placeholder: 'Вибрати…',
  className: '',
};

export default Select;
