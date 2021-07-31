import 'codemirror/mode/css/css';
import 'codemirror/addon/display/placeholder';
//
import { MyComponent } from '@lib';
import { CodeContainer } from '@components/common';
import './Code.scss';

const MAX_CODE_LINES = 21;

export class Code extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames classNames from outer component
   */
  constructor({ classNames = [] }) {
    super({
      classNames: [...classNames, 'code'],
    });

    this.css = new CodeContainer({
      classNames: ['code__container'],
      title: 'CSS Editor',
      fileName: 'style.css',
      type: 'css',
      maxCodeLines: MAX_CODE_LINES,
    });

    this.html = new CodeContainer({
      classNames: ['code__container'],
      title: 'HTML Viewer',
      fileName: 'index.html',
      type: 'html',
      maxCodeLines: MAX_CODE_LINES,
    });

    this.appendChildren(this.css, this.html);
  }

  render() {
    return this && null;
  }
}
