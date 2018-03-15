import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { current } from '../../config';

import Editor from '../../utils/editor';
import ImageDropzone from '../ImageDropzone';
import Popup from '../Popup';
import PrettifyableInput from '../PrettifyableInput';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';

import FormWithAutosave from './FormWithAutosave';

class ProjectForm extends FormWithAutosave {
  constructor(props) {
    super(props);

    this.state = { ...props.project };
    this.state.removePopupVisible = false;
    this.state.autosaveId = props.project.id || 'new-project';

    this.generateProjectLink = this.generateProjectLink.bind(this);
    this.submit = this.submit.bind(this);
  }

  generateProjectLink() {
    const prefix = `${current.clientURL}/projects`;
    const path = this.state.path || '';
    const fullLink = `${prefix}/${path}`;

    return <Link as={`/projects/${path}`} href={`/project?path=${path}`}><a>{fullLink}</a></Link>;
  }

  async submit() {
    if (!this.state.title) {
      // TODO: show error popup

      return;
    }

    this.props.onSubmit(this.state);
  }

  componentWillReceiveProps({ project }) {
    const { image } = project;

    if (this.state.image instanceof global.File && image && image.id) {
      this.setState({ image });
    }
  }

  render() {
    const { project, disabled } = this.props;
    const formTitle = project.path ? 'Редагувати проект' : 'Новий проект';
    const link = this.generateProjectLink();
    const imageURL = project.image ? project.image.small : null;

    return (
      <div className="project-form">
        <h2>{formTitle}</h2>
        <div className="children-vertical-padding layout-row layout-wrap">
          <PrettifyableInput
            label="Назва"
            value={this.state.title}
            disabled={disabled}
            onChange={title => this.updateFormData({ title })}
            className="flex-100"
          />
          <div className="layout-row layout-align-start-center flex-100">
            <Input
              compact
              label="Адреса (латинські букви, цифри, дефіси)"
              value={this.state.path}
              disabled={disabled}
              onChange={path => this.updateFormData({ path })}
              pattern="^[a-z0-9][a-z0-9-]*[a-z0-9]$"
              className="flex-50"
            />
            <div className="nowrap text-overflow-ellipsis margin-left flex-50">
              {link}
            </div>
          </div>
          <div className="flex-100">
            <div className="margin-bottom-small">Зображення</div>
            <ImageDropzone
              imageURL={imageURL}
              key={imageURL}
              disabled={disabled}
              onChange={image => this.updateFormData({ image })}
              className="flex-100"
            />
          </div>
          <PrettifyableInput
            label="Короткий опис"
            value={this.state.description}
            disabled={disabled}
            onChange={description => this.updateFormData({ description })}
            className="flex-100"
          />
          <div className="flex-100">
            <div className="margin-bottom-small">Довгий опис</div>
            <Editor disabled={disabled} html={this.state.body} onChange={body => this.updateFormData({ body })} />
          </div>
          <div className="flex-100 layout-row layout-align-space-between-center">
            <div className="flex-15">
              {
                this.props.project.id &&
                <Button disabled={disabled} onClick={() => this.setState({ removePopupVisible: true })} color="red">
                  Видалити
                </Button>
              }
            </div>
            <div className="layout-row layout-align-start-center flex-30">
              <Checkbox
                label="Заховати"
                checked={this.state.private}
                disabled={disabled}
                onChange={hidden => this.updateFormData({ private: hidden })}
              />
              <Button disabled={disabled} onClick={this.submit} className="flex-100 margin-left">Зберегти</Button>
            </div>
          </div>
        </div>
        <Popup visible={this.state.removePopupVisible}>
          <p>Точно видалити цей проект?</p>
          <div className="layout-row">
            <Button onClick={() => this.setState({ removePopupVisible: false })} color="black">Скасувати</Button>
            <Button onClick={this.props.onRemove} color="red" className="margin-left">Видалити</Button>
          </div>
        </Popup>
      </div>
    );
  }
}

ProjectForm.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string,
    path: PropTypes.string,
    image: PropTypes.object,
  }),
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};

ProjectForm.defaultProps = {
  project: {},
  disabled: false,
  onRemove: null,
};

export default ProjectForm;
