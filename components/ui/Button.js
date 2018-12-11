import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Icon = iconName => (<i className={`button-icon ${iconName}`} />);

const LinkButton = ({ href, as, icon, children }) => (
  <Link href={href} as={as}>
    <a className="button-element">
      {icon ? Icon(icon) : null}
      {children}
    </a>
  </Link>
);

const RealButton = ({ icon, children, onClick }) => (
  <button
    onClick={onClick}
    className="button-element"
  >
    {icon ? Icon(icon) : null}
    {children}
  </button>
);

const Button = (props) => {
  const {
    children,
    disabled,
    onClick,
    href,
    as,
    color,
    icon,
    className,
  } = props;

  const button = href
    ? LinkButton({ href, as, icon, children })
    : RealButton({ icon, children, onClick });
  const classList = ['button', `button-color-${color}`, className];

  if (disabled) {
    classList.push('button-disabled');
  }

  return (
    <div className={classList.join(' ')}>
      {button}
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
  as: PropTypes.string,
  color: PropTypes.oneOf(['green', 'red', 'black']),
  icon: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  disabled: false,
  color: 'green',
  icon: '',
  onClick: null,
  href: '',
  as: '',
};

LinkButton.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
};

LinkButton.defaultProps = {
  icon: '',
  href: '',
  as: '',
};

RealButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
};

RealButton.defaultProps = {
  icon: '',
  onClick: null,
};

export default Button;
