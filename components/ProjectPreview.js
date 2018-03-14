import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import generateBackgroundGradient from '../helpers/generate-background-gradient';

const ProjectPreview = (props) => {
  const { from, to } = generateBackgroundGradient(props);

  const style = {};
  const classList = ['project-preview', props.className];
  const image = props.image || {};

  style.backgroundImage = `url("${image.large}"), linear-gradient(to bottom right, ${from}, ${to})`;

  if (props.image) {
    classList.push('project-preview-with-image');
  } else {
    classList.push('project-preview-no-image');
  }

  if (props.large) {
    classList.push('project-preview-large');
  }

  if (props.short) {
    classList.push('project-preview-short');
  }

  let title;

  if (props.large) {
    title = <h2 className="project-preview-title flex-100">{props.title}</h2>;
  } else if (props.short) {
    title = <h3 className="project-preview-title flex-100">Проект «{props.title}»</h3>;
  } else {
    title = <h3 className="project-preview-title flex-100">{props.title}</h3>;
  }

  return (
    <Link href={`/project?path=${props.path}`} as={`/projects/${props.path}`}>
      <a className={classList.join(' ')} style={style}>
        <div className="project-preview-content layout-row layout-align-start-center">
          {props.private && <div className="project-preview-hidden-badge" />}
          <div className="project-preview-text layout-row layout-align-start-center layout-wrap flex-100">
            {title}
            {props.description && <div className="project-preview-description flex-100">{props.description}</div>}
          </div>
        </div>
        <div className="project-preview-background-gradient" />
      </a>
    </Link>
  );
};

ProjectPreview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  image: PropTypes.shape({
    original: PropTypes.string,
    large: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
    averageColor: PropTypes.arrayOf(PropTypes.number),
  }),
  private: PropTypes.bool,
  large: PropTypes.bool,
  short: PropTypes.bool,
  className: PropTypes.string,
};

ProjectPreview.defaultProps = {
  image: {},
  large: false,
  short: false,
  private: false,
  className: '',
};

export default ProjectPreview;
