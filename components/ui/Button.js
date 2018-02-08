import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Button = (props) => {
  let buttonElement;

  if (props.onClick) {
    buttonElement = (
      <button
        onClick={props.onClick}
        className="button-element"
      >
        {props.children}
      </button>
    );
  }

  if (props.href) {
    buttonElement = (
      <Link href={props.href} as={props.as}>
        <a className="button-element">
          {props.children}
        </a>
      </Link>
    );
  }

  const classList = ['button', `button-color-${props.color}`, props.className];

  return (
    <div className={classList.join(' ')}>
      {buttonElement}
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  as: PropTypes.string,
  color: PropTypes.oneOf(['green', 'red', 'black']),
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  color: 'green',
  onClick: null,
  href: '',
  as: '',
};

export default Button;
