import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import HiddenBadge from '../ui/badges/Hidden';

class PanelSectionItem extends React.Component {
  generateItemLink() {
    let href;
    let as;

    switch (this.props.type) {
      case 'project': {
        href = `/admin/projects/edit?path=${this.props.path}`;
        as = `/admin/projects/${this.props.path}/edit`;
        break;
      }
      case 'category': {
        href = `/admin/categories/edit?path=${this.props.path}`;
        as = `/admin/categories/${this.props.path}/edit`;
        break;
      }
      case 'page': {
        href = `/admin/pages/edit?path=${this.props.path}`;
        as = `/admin/pages/${this.props.path}/edit`;
        break;
      }
      case 'article': {
        href = `/admin/articles/edit?path=${this.props.path}`;
        as = `/admin/articles/${this.props.path}/edit`;
        break;
      }
      case 'photo-album': {
        href = `/admin/photo-albums/edit?path=${this.props.path}`;
        as = `/admin/photo-albums/${this.props.path}/edit`;
        break;
      }
      default: {
        href = '';
        as = '';
      }
    }

    return <Link href={href} as={as}><a>{this.props.title}</a></Link>;
  }

  render() {
    const link = this.generateItemLink();
    const { hideBadges, className } = this.props;
    const badges = this.props.hidden
      ? (
        <div className="admin-panel-section-item-badges">
          <HiddenBadge />
        </div>
      )
      : null;

    return (
      <div className={`admin-panel-section-item layout-row layout-align-start-start ${className}`}>
        <div className="admin-panel-section-item-title layout-row layout-align-start-center">
          {link}
          {!hideBadges && badges}
        </div>
      </div>
    );
  }
}

PanelSectionItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['article', 'category', 'project', 'page', 'photo-album']).isRequired,
  hidden: PropTypes.bool,
  hideBadges: PropTypes.bool,
  className: PropTypes.string,
};

PanelSectionItem.defaultProps = {
  hidden: false,
  hideBadges: false,
  className: '',
};

export default PanelSectionItem;
