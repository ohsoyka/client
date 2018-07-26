import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = (props) => {
  const {
    percent,
    processedItems,
    totalItems,
    className,
  } = props;
  const roundedPercent = Math.ceil(percent);
  const classList = ['progress-bar', className];

  return (
    <div className={classList.join(' ')}>
      <div className="progress-bar-container">
        <div className="progress-bar-bar" style={{ width: `${roundedPercent}%` }} />
        <div className="progress-bar-percent smaller">{roundedPercent}%</div>
      </div>
      <div className="progress-bar-total smaller">{processedItems} / {totalItems}</div>
    </div>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
  processedItems: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  className: PropTypes.string,
};

ProgressBar.defaultProps = {
  className: '',
};

export default ProgressBar;
