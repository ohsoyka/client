import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Colors from '../services/colors';

const ProjectPreview = (props) => {
  const { from, to } = Colors.stringToHEXGradient(props.title);

  const style = {};
  const classList = ['project-preview', props.className];

  if (props.image) {
    style.backgroundImage = `url("${props.image}")`;
    classList.push('project-preview-with-image');
  } else {
    style.background = `linear-gradient(to bottom right, ${from}, ${to})`;
    classList.push('project-preview-no-image');
  }

  return (
    <Link href={`/project?path=${props.path}`} as={`/projects/${props.path}`}>
      <a className={classList.join(' ')} style={style}>
        <div className="project-preview-content layout-row layout-align-start-center">
          <div className="project-preview-text layout-row layout-align-start-center layout-wrap flex-100">
            <h3 className="project-preview-title flex-100">{props.title}</h3>
            <div className="flex-100">{props.description}</div>
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
  image: PropTypes.string,
  className: PropTypes.string,
};

ProjectPreview.defaultProps = {
  image: '',
  className: '',
};

export default ProjectPreview;
