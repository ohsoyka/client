import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';

import { current } from '../../config';

import Editor from '../../utils/editor';
import ImageDropzone from '../ImageDropzone';
import Popup from '../Popup';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Select from '../ui/Select';

const DATE_FORMAT = 'DD.MM.YYYY HH:mm';

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...props.article };
    this.state.removePopupVisible = false;
    this.state.tagsString = props.article.tags && props.article.tags.length ? props.article.tags.join(', ') : '';
    this.state.dateString = props.article.publishedAt ? moment(props.article.publishedAt).format(DATE_FORMAT) : '';

    this.generateArticleLink = this.generateArticleLink.bind(this);
    this.submit = this.submit.bind(this);
  }

  generateArticleLink() {
    const prefix = `${current.clientURL}`;
    const path = this.state.path || '';
    const fullLink = `${prefix}/${path}`;

    return <Link as={`/${path}`} href={`/articles?path=${path}`}><a>{fullLink}</a></Link>;
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

    this.props.onSubmit(Object.assign({}, this.state, { tags, publishedAt }));
  }

  render() {
    const formTitle = this.props.article.path ? 'Редагувати статтю' : 'Нова стаття';
    const link = this.generateArticleLink();
    const { disabled, article } = this.props;
    const imageURL = article.image ? article.image.small : null;

    return (
      <div className="article-form">
        <h2>{formTitle}</h2>
        <div className="children-vertical-padding layout-row layout-wrap">
          <Input
            label="Назва"
            value={this.state.title}
            disabled={disabled}
            onChange={title => this.setState({ title })}
            className="flex-100"
          />
          <div className="layout-row layout-align-start-center flex-100">
            <Input
              compact
              label="Адреса (латинські букви, цифри, дефіси)"
              value={this.state.path}
              disabled={disabled}
              onChange={path => this.setState({ path })}
              pattern="^[a-z0-9][a-z0-9-]*[a-z0-9]$"
              className="flex-50"
            />
            <div className="nowrap text-overflow-ellipsis margin-left flex-50">
              {link}
            </div>
          </div>
          <div className="flex-100">
            <div className="margin-bottom-small">Головне зображення</div>
            <ImageDropzone
              imageURL={imageURL}
              key={imageURL}
              disabled={disabled}
              onChange={image => this.setState({ image })}
              className="flex-100"
            />
          </div>
          <div className="layout-row flex-100">
            <Select
              label="Проект"
              value={this.state.project}
              options={this.props.projects.map(project => ({ value: project.id, label: project.title }))}
              clearable
              disabled={disabled}
              onChange={project => this.setState({ project })}
              className="flex-50"
            />
            <Select
              label="Категорія"
              value={this.state.category}
              options={this.props.categories.map(category => ({ value: category.id, label: category.title }))}
              clearable
              disabled={disabled}
              onChange={category => this.setState({ category })}
              className="flex-50 margin-left"
            />
          </div>
          <Input
            label="Короткий опис"
            value={this.state.brief}
            disabled={disabled}
            onChange={brief => this.setState({ brief })}
            className="flex-100"
          />
          <div className="flex-100">
            <div className="margin-bottom-small">Вступ</div>
            {
              !this.state.projectDescriptionAsIntro &&
              <Input
                value={this.state.intro}
                disabled={disabled}
                onChange={intro => this.setState({ intro })}
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
                onChange={projectDescriptionAsIntro => this.setState({ projectDescriptionAsIntro })}
                className="margin-top-small"
              />
            }
          </div>
          <div className="flex-100">
            <div className="margin-bottom-small">Текст</div>
            <Editor html={this.state.body} onChange={body => this.setState({ body })} disabled={disabled} />
          </div>
          <div className="layout-row layout-align-start-center flex-100">
            <Input
              label="Теґи (через кому)"
              value={this.state.tagsString}
              disabled={disabled}
              onChange={tagsString => this.setState({ tagsString })}
              className="flex-100"
            />
            <Input
              label="Дата публікації"
              placeholder="ДД.ММ.РРРР гг:хх"
              value={this.state.dateString}
              disabled={disabled}
              onChange={dateString => this.setState({ dateString })}
              pattern="[0-3][0-9]\.[0-1][0-9]\.[1-2][0-9][0-9][0-9] [0-2][0-9]:[0-5][0-9]"
              className="margin-left"
              nativeElementClassName="text-center"
            />
          </div>
          <div className="flex-100 layout-row layout-align-space-between-center">
            <div className="flex-15">
              {
                this.props.article.id &&
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
                onChange={hidden => this.setState({ private: hidden })}
              />
              <Button disabled={disabled} onClick={this.submit} className="flex-100 margin-left">Зберегти</Button>
            </div>
          </div>
        </div>
        <Popup visible={this.state.removePopupVisible}>
          <p>Точно видалити цю статтю?</p>
          <div className="layout-row">
            <Button onClick={() => this.setState({ removePopupVisible: false })} color="black">Скасувати</Button>
            <Button onClick={this.props.onRemove} color="red" className="margin-left">Видалити</Button>
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
  }),
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ArticleForm.defaultProps = {
  article: {},
  onRemove: null,
  disabled: false,
};

export default ArticleForm;
