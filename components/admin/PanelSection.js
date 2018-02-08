import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

class PanelSection extends React.Component {
  generateLinkToFullSection() {
    return <Link href={`/admin/${this.props.href}`}><a>&rarr;</a></Link>;
  }

  render() {
    const notEmpty = Boolean(this.props.children.length);
    const content = notEmpty ? this.props.children : <p className="admin-panel-section-placeholder">Тут нічого немає</p>;
    const linkToFullSection = this.generateLinkToFullSection();

    return (
      <div className={`admin-panel-section-wrapper ${this.props.className}`}>
        <div className="admin-panel-section">
          {
            this.props.title &&
            <div className="admin-panel-section-title layout-row layout-align-space-between-center">
              <h3>{this.props.title}</h3>
              {notEmpty && this.props.href && <h3 className="">{linkToFullSection}</h3>}
            </div>
          }
          <div className="admin-panel-section-content">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

PanelSection.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
};

PanelSection.defaultProps = {
  href: '',
  className: '',
};

export default PanelSection;
