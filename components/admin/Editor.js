// Warning: this component can be used client-side only
// Import it using dynamic import with "ssr: false"

import React from 'react';
import PropTypes from 'prop-types';
import { current } from '../../config';

import '../../static/libs/froala/froala_editor.pkgd.min';
import '../../static/libs/froala/plugins/image.min';
import '../../static/libs/froala/languages/uk';
import editorStyles from '../../static/libs/froala/froala_editor.pkgd.min.css';
import styles from '../../static/libs/froala/froala_style.min.css';
import theme from '../../static/libs/froala/themes/custom.css';

const FULL_WIDTH_IMAGE_CLASS = 'image-full-width';

$.FroalaEditor.DefineIcon('prettify', { NAME: 'wrench' });
$.FroalaEditor.RegisterCommand('prettify', {
  title: 'Зробити гарно',
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback() {
    const currentHTML = this.html.get();
    const beautifiedHTML = global.LinaKostenko(currentHTML);

    this.html.set(beautifiedHTML);
  },
});

$.FroalaEditor.DefineIcon('imageFullWidth', { NAME: 'align-justify' });
$.FroalaEditor.RegisterCommand('imageFullWidth', {
  title: 'Розтягнення на всю ширину',
  focus: false,
  undo: false,
  refreshAfterCallback: false,
  callback() {
    const $image = this.image.get();

    if ($image.hasClass(FULL_WIDTH_IMAGE_CLASS)) {
      $image.removeClass(FULL_WIDTH_IMAGE_CLASS);
    } else {
      $image.addClass(FULL_WIDTH_IMAGE_CLASS);
    }
  },
});

const buttons = [
  'bold', 'italic', 'underline', 'strikeThrough', '|', 'paragraphFormat', 'paragraphStyle', 'align', 'formatOL', 'formatUL', '|', 'subscript', 'superscript', '|', 'clearFormatting',
  '|', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'quote', 'code', 'insertTable', '|', 'insertHR', 'fullscreen', 'html', 'prettify',
];

class Editor extends React.Component {
  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    const $editor = $('.editor');

    $editor.froalaEditor('destroy');
  }

  init() {
    const $editor = $('.editor');

    $editor.froalaEditor({
      charCounterCount: false,
      height: 350,
      heightMax: 350,

      fileMaxSize: 15 * 1024 * 1024,
      fileUploadMethod: 'POST',
      fileUploadParam: 'files',
      fileUploadURL: `${current.apiURL}/files/froala`,

      htmlAllowedEmptyTags: ['iframe', 'object', 'video', 'cut', 'pre', 'code'],
      htmlAllowedTags: ['a', 'abbr', 'address', 'audio', 'b', 'blockquote', 'br', 'cite', 'code', 'cut', 'div', 'em', 'embed', 'figcaption', 'figure', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'iframe', 'img', 'li', 'link', 'object', 'ol', 'p', 'pre', 's', 'span', 'small', 'source', 'strike', 'strong', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'u', 'ul', 'video'],
      htmlDoNotWrapTags: ['br', 'blockquote', 'code', 'pre', 'hr', 'img'],
      htmlExecuteScripts: false,
      htmlUntouched: true,

      imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
      imageDefaultWidth: 0,
      imageEditButtons: ['imageReplace', 'imageRemove', 'imageFullWidth', '-', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove'],
      imageMaxSize: 15 * 1024 * 1024,
      imagePasteProcess: true,
      imageUploadMethod: 'POST',
      imageUploadParam: 'images',
      imageUploadURL: `${current.apiURL}/images/froala`,

      language: 'uk',

      paragraphFormat: {
        N: 'Звичайний',
        H1: 'Заголовок 1',
        H2: 'Заголовок 2',
        H3: 'Заголовок 3',
        H4: 'Заголовок 4',
        SMALL: 'Маленький',
      },

      paragraphStyles: {
        longquote: 'Довга цитата',
      },

      pastePlain: true,
      quickInsertButtons: ['image', 'video', 'hr'],

      requestWithCredentials: true,

      theme: 'custom',

      toolbarButtons: buttons,
      toolbarButtonsMD: buttons,
      toolbarButtonsSM: buttons,
      toolbarButtonsXS: buttons,

      videoDefaultWidth: 0,
      videoEditButtons: ['videoReplace', 'videoRemove', '|', 'videoAlign', 'videoSize'],
      videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
      videoMove: false,

      width: '100%',
    });

    $editor.froalaEditor('html.set', this.props.html);

    $editor.on('froalaEditor.contentChanged', () => {
      const content = $editor.froalaEditor('html.get');

      this.props.onChange(content);
    });

    $editor.on('froalaEditor.video.inserted', (e, editor, $video) => {
      const videoSource = $video.contents().get(0).src;
      $video.html(`<p class="video-16-9"><iframe src="${videoSource}" frameborder="0" allowfullscreen></iframe></p>`);
    });
  }

  render() {
    const { label, disabled } = this.props;
    const classList = ['editor-wrapper'];

    if (disabled) {
      classList.push('editor-wrapper-disabled');
    }

    return (
      <div className={classList.join(' ')}>
        {label && <div className="editor-label">{label}</div>}
        <style>{ editorStyles + styles + theme }</style>
        <div className="editor" />
        <div className="editor-mask" />
      </div>
    );
  }
}

Editor.propTypes = {
  label: PropTypes.string,
  html: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  label: '',
  disabled: false,
  html: '<p></p>',
};

export default Editor;
