import 'codemirror/mode/css/css';
import 'codemirror/addon/display/placeholder';
//
import { MyComponent } from '@lib';
import { MAX_CODE_LINES } from '@constants';
import { CodeContainer } from '@components/common';
import { highlight } from '../../../utils';
import { Input } from './Input/Input';
import { getCssDescriptionFragment } from './get-css-description-fragment';
import './CodeMirror.scss';
import './Code.scss';

export class Code extends MyComponent {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames classNames from outer component
   * @param {Function} props.checkAnswerCb check answer
   */
  constructor({ classNames = [], checkAnswerCb }) {
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

    const CSSDescriptionFragment = getCssDescriptionFragment();

    this.input = new Input({ classNames: ['code__input'], checkAnswerCb });

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
   * @param {DocumentFragment} props.codeLevelFragment
   */
  render({ codeLevelFragment }) {
    this.htmlContainer.clearMainContent();
    this.htmlContainer.appendMainInnerHTML(
      'afterBegin',
      highlight('<div class="field">')
    );
    this.htmlContainer.appendMainContent(codeLevelFragment);
    this.htmlContainer.appendMainInnerHTML('beforeEnd', highlight('</div>'));

    this.input.render();
  }
}
