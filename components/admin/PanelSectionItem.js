import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

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
      default: {
        href = '';
        as = '';
      }
    }

    return <Link href={href} as={as}><a>{this.props.title}</a></Link>;
  }

  render() {
    const link = this.generateItemLink();

    return (
      <div className={`admin-panel-section-item ${this.props.className}`}>
        <div className="admin-panel-section-item-title">{link}</div>
      </div>
    );
  }
}

PanelSectionItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['article', 'category', 'project', 'page']).isRequired,
  className: PropTypes.string,
};

PanelSectionItem.defaultProps = {
  className: '',
};

export default PanelSectionItem;
