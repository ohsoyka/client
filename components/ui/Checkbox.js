import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '../../public/static/icons/check.svg';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.change = this.change.bind(this);
  }

  change(event) {
    this.props.onChange(event.target.checked);
  }

  render() {
    const {
      checked,
      disabled,
      label,
      className,
    } = this.props;
    const checkboxId = `checkbox-${label}`;
    const classList = ['checkbox', className];

    if (disabled) {
      classList.push('checkbox-disabled');
    }

    return (
      <div className={classList.join(' ')}>
        <label htmlFor={checkboxId} className="layout-row layout-align-start-center">
          <div className="checkbox-square">
            {checked && <CheckIcon />}
          </div>
          <span className="checkbox-label">{label}</span>
          <input id={checkboxId} type="checkbox" disabled={disabled} checked={checked} onChange={this.change} className="checkbox-native" />
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  className: '',
};

export default Checkbox;
