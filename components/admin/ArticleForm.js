import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';

import { current } from '../../config';

import Editor from '../../utils/editor';
import ImageDropzone from '../ImageDropzone';
import Popup from '../Popup';
import PrettifyableInput from '../PrettifyableInput';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Select from '../ui/Select';

import FormWithAutosave from './FormWithAutosave';

const ImageDropzoneWithPreview = ImageDropzone();
const DATE_FORMAT = 'DD.MM.YYYY HH:mm';

class ArticleForm extends FormWithAutosave {
  constructor(props) {
    super(props);

    this.state = { ...props.article };
    this.state.removePopupVisible = false;
    this.state.tagsString = props.article.tags && props.article.tags.length ? props.article.tags.join(', ') : '';
    this.state.dateString = props.article.publishedAt ? moment(props.article.publishedAt).format(DATE_FORMAT) : '';

    this.state.autosaveId = props.article.id || 'new-article';

    this.generateArticleLink = this.generateArticleLink.bind(this);
    this.submit = this.submit.bind(this);
  }

  generateArticleLink() {
    const prefix = `${current.clientURL}`;
    const path = this.state.path || '';
    const fullLink = `${prefix}/${path}`;

    return <Link as={`/${path}`} href={`/article?path=${path}`}><a>{fullLink}</a></Link>;
  }

  async submit() {
    if (!(this.state.title && this.state.body)) {
      // TODO: show error popup

      return;
    }

    const tags = this.state.tagsString.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag)
      .filter((tag, index, collection) => collection.indexOf(tag) === index);
    const publishedAt = this.state.dateString ? moment(this.state.dateString, DATE_FORMAT).toDate() : new Date();

    try {
      await this.props.onSubmit({ ...this.state, tags, publishedAt });
      this.clearAutosavedData();
    } catch (error) {
      console.error(error);
    }
  }

  componentWillReceiveProps({ article }) {
    const { image } = article;

    if (this.state.image instanceof global.File && image && image.id) {
      this.setState({ image });
    }
  }

  render() {
    const formTitle = this.props.article.path ? 'Редагувати статтю' : 'Нова стаття';
    const link = this.generateArticleLink();
    const { disabled } = this.props;

    return (
      <div className="article-form">
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
            <div className="margin-bottom-small">Головне зображення</div>
            <div className="layout-row flex-100">
              <div className="flex-65">
                <div className="margin-bottom-small smaller">Для альбомної орієнтації</div>
                <ImageDropzoneWithPreview
                  images={[this.state.image]}
                  limit={1}
                  disabled={disabled}
                  onChange={([image]) => this.setState({ image })}
                />
              </div>
              <div className="flex-35 margin-left">
                <div className="margin-bottom-small smaller">Для портретної орієнтації (необов&apos;язково)</div>
                <ImageDropzoneWithPreview
                  images={[this.state.portraitImage]}
                  limit={1}
                  disabled={disabled}
                  onChange={([portraitImage]) => this.setState({ portraitImage })}
                />
              </div>
            </div>
          </div>
          <div className="layout-row flex-100">
            <Select
              label="Проект"
              value={this.state.project}
              options={this.props.projects.map(project => ({ value: project.id, label: project.title }))}
              clearable
              disabled={disabled}
              onChange={project => this.updateFormData({ project })}
              className="flex-50"
            />
            <Select
              label="Категорія"
              value={this.state.category}
              options={this.props.categories.map(category => ({ value: category.id, label: category.title }))}
              clearable
              disabled={disabled}
              onChange={category => this.updateFormData({ category })}
              className="flex-50 margin-left"
            />
          </div>
          <PrettifyableInput
            label="Короткий опис"
            value={this.state.brief}
            disabled={disabled}
            onChange={brief => this.updateFormData({ brief })}
            className="flex-100"
          />
          <div className="flex-100">
            <div className="margin-bottom-small">Вступ</div>
            {
              !this.state.projectDescriptionAsIntro &&
              <PrettifyableInput
                value={this.state.intro}
                disabled={disabled}
                onChange={intro => this.updateFormData({ intro })}
                multiline
                className="flex-100"
              />
            }
            {
              this.state.project &&
              <Checkbox
                label="Використати опис проекту замість вступу"
                checked={this.state.projectDescriptionAsIntro}
                disabled={disabled}
                onChange={projectDescriptionAsIntro => this.updateFormData({ projectDescriptionAsIntro })}
                className="margin-top-small"
              />
            }
          </div>
          <div className="flex-100">
            <div className="margin-bottom-small">Текст</div>
            <Editor html={this.state.body} onChange={body => this.updateFormData({ body })} disabled={disabled} />
          </div>
          <div className="layout-row layout-align-start-center flex-100">
            <Input
              label="Теґи (через кому)"
              value={this.state.tagsString}
              disabled={disabled}
              onChange={tagsString => this.updateFormData({ tagsString })}
              className="flex-100"
            />
            <Input
              label="Дата публікації"
              placeholder="ДД.ММ.РРРР гг:хх"
              value={this.state.dateString}
              disabled={disabled}
              onChange={dateString => this.updateFormData({ dateString })}
              pattern="[0-3][0-9]\.[0-1][0-9]\.[1-2][0-9][0-9][0-9] [0-2][0-9]:[0-5][0-9]"
              className="margin-left"
              nativeElementClassName="text-center"
            />
          </div>
          <div className="flex-100 layout-row layout-align-space-between-center">
            {
              this.props.article.id &&
              <Button
                disabled={disabled}
                onClick={() => this.setState({ removePopupVisible: true })}
                color="red"
                icon="fas fa-trash-alt"
                className="margin-right"
              >
                Видалити
              </Button>
            }
            <div className="layout-row layout-align-start-center">
              <Checkbox
                label="Заховати"
                checked={this.state.hidden}
                disabled={disabled}
                onChange={hidden => this.updateFormData({ hidden })}
              />
              <Button
                disabled={disabled}
                onClick={this.submit}
                icon="fas fa-save"
                className="margin-left"
              >
                Зберегти
              </Button>
            </div>
          </div>
        </div>
        <Popup title="Точно видалити цю статтю?" visible={this.state.removePopupVisible}>
          <div className="layout-row layout-align-end-center">
            <Button onClick={() => this.setState({ removePopupVisible: false })} color="black">Скасувати</Button>
            <Button onClick={this.props.onRemove} color="red" icon="fas fa-trash-alt" className="margin-left">Видалити</Button>
          </div>
        </Popup>
      </div>
    );
  }
}

ArticleForm.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    path: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    publishedAt: PropTypes.instanceOf(Date),
    image: PropTypes.object,
    portraitImage: PropTypes.object,
    hidden: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ArticleForm.defaultProps = {
  article: {
    hidden: true,
  },
  onRemove: null,
  disabled: false,
};

export default ArticleForm;
