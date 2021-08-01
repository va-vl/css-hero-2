import 'codemirror/mode/css/css';
import 'codemirror/addon/display/placeholder';
//
import { MyComponent } from '@lib';
import { CodeContainer } from '@components/common';
import { highlight } from '../../../utils';
import { Input } from './Input/Input';
import './CodeMirror.scss';
import './Code.scss';

const MAX_CODE_LINES = 21;
const CSS_DESCRIPTION = `{
  /* Some CSS rules */
}

/*
  Type in a number to select a level:
  "5" switches to level 5
*/`;

const processDescription = (text) => {
  const fragment = new DocumentFragment();

  text.split('\n').forEach((line) => {
    fragment.append(line);
    fragment.append(new MyComponent({ tagName: 'br' }).HTMLElement);
  });

  return fragment;
};

export class Code extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames classNames from outer component
   */
  constructor({ classNames = [] }) {
    super({
      classNames: [...classNames, 'code'],
    });

    this.cssContainer = new CodeContainer({
      classNames: ['code__container', 'code__container--css'],
      title: 'CSS Editor',
      fileName: 'style.css',
      type: 'css',
      maxCodeLines: MAX_CODE_LINES,
    });

    const CSSDescriptionFragment = processDescription(CSS_DESCRIPTION);

    this.input = new Input({ classNames: ['code__input'] });

    this.cssContainer.setMainContent(this.input, CSSDescriptionFragment);

    this.cssContainer.HTMLElement.onclick = () => {
      this.input.codeMirror.focus();
    };

    this.htmlContainer = new CodeContainer({
      classNames: ['code__container', 'code__container--html'],
      title: 'HTML Viewer',
      fileName: 'index.html',
      type: 'html',
      maxCodeLines: MAX_CODE_LINES,
    });

    this.appendChildren(
      new MyComponent({
        classNames: ['code__flex-wrapper'],
        children: [this.cssContainer, this.htmlContainer],
      })
    );
  }

  /**
   * @param {Object} props
   * @param {DocumentFragment} codeLevelFragment
   */
  render({ codeLevelFragment }) {
    this.htmlContainer.clearMainContent();
    this.htmlContainer.appendMainInnerHTML(
      'afterBegin',
      highlight('<div class="field"')
    );
    this.htmlContainer.appendMainContent(codeLevelFragment);
    this.htmlContainer.appendMainInnerHTML('beforeEnd', highlight('</div>'));
  }
}
