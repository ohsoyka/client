import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { current } from '../../config';

import Dropzone from '../Dropzone';
import Popup from '../Popup';
import Input from '../ui/Input';
import Button from '../ui/Button';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...props.category };
    this.state.removePopupVisible = false;

    this.generateCategoryLink = this.generateCategoryLink.bind(this);
    this.submit = this.submit.bind(this);
  }

  generateCategoryLink() {
    const prefix = `${current.clientURL}/categories`;
    const path = this.state.path || '';
    const fullLink = `${prefix}/${path}`;

    return <Link as={`/categories/${path}`} href={`/categories?path=${path}`}><a>{fullLink}</a></Link>;
  }

  async submit() {
    if (!this.state.title) {
      // TODO: show error popup

      return;
    }

    this.props.onSubmit(this.state);
  }

  render() {
    const formTitle = this.props.category.path ? 'Редагувати категорію' : 'Нова категорія';
    const link = this.generateCategoryLink();

    return (
      <div className="category-form">
        <h2>{formTitle}</h2>
        <div className="children-vertical-padding layout-row layout-wrap">
          <Input
            label="Назва"
            value={this.state.title}
            onChange={title => this.setState({ title })}
            className="flex-100"
          />
          <div className="layout-row layout-align-start-center flex-100">
            <Input
              compact
              label="Адреса (латинські букви, цифри, дефіси)"
              value={this.state.path}
              onChange={path => this.setState({ path })}
              pattern="^[a-z0-9][a-z0-9-]*[a-z0-9]$"
              className="flex-50"
            />
            <div className="nowrap text-overflow-ellipsis margin-left flex-50">
              {link}
            </div>
          </div>
          <div className="layout-row layout-wrap layout-align-start-start flex-100">
            <div className="flex-100 flex-gt-xs-50">
              <div className="margin-bottom-small">Головне зображення</div>
              <Dropzone
                limit={1}
                files={[this.state.image]}
                onDrop={([image]) => this.setState({ image })}
              />
            </div>
          </div>
          <Input
            label="Короткий опис"
            value={this.state.description}
            onChange={description => this.setState({ description })}
            className="flex-100"
          />
          <div className="flex-100 layout-row layout-align-space-between-center">
            <div className="flex-15">
              {
                this.props.category.id &&
                <Button onClick={() => this.setState({ removePopupVisible: true })} color="red">
                  Видалити
                </Button>
              }
            </div>
            <div className="layout-row layout-align-start-center flex-30">
              <Button onClick={this.submit} className="flex-100 margin-left">Зберегти</Button>
            </div>
          </div>
        </div>
        <Popup visible={this.state.removePopupVisible}>
          <p>Точно видалити цю категорію?</p>
          <div className="layout-row">
            <Button onClick={() => this.setState({ removePopupVisible: false })} color="black">Скасувати</Button>
            <Button onClick={this.props.onRemove} color="red" className="margin-left">Видалити</Button>
          </div>
        </Popup>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string,
    path: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};

CategoryForm.defaultProps = {
  category: {},
  onRemove: null,
};

export default CategoryForm;
