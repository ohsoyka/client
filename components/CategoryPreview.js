import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Colors from '../services/colors';

const CategoryPreview = (props) => {
  const { from, to } = Colors.stringToHEXGradient(props.title);

  const style = {};
  const classList = ['category-preview', props.className];

  if (props.image) {
    style.backgroundImage = `url("${props.image}")`;
    classList.push('category-preview-with-image');
  } else {
    style.background = `linear-gradient(to bottom right, ${from}, ${to})`;
  }

  return (
    <Link href={`/category?path=${props.path}`} as={`/categories/${props.path}`}>
      <a className={classList.join(' ')}>
        <div className="category-preview-inner" style={style}>
          <div className="category-preview-content ">
            <div className="category-preview-text layout-row layout-align-start-center layout-wrap">
              <h3 className="category-preview-title">{props.title}</h3>
              <div className="category-preview-description flex-100">{props.description}</div>
            </div>
          </div>
          <div className="category-preview-background-gradient" />
        </div>
      </a>
    </Link>
  );
};

CategoryPreview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  image: PropTypes.string,
  className: PropTypes.string,
};

CategoryPreview.defaultProps = {
  image: '',
  className: '',
};

export default CategoryPreview;
