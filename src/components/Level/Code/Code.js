import 'codemirror/mode/css/css';
import 'codemirror/addon/display/placeholder';
//
import { MyComponent } from '@lib';
import { CodeContainer } from '@components/common';
import './Code.scss';

const MAX_CODE_LINES = 21;

export class Code extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   */
  constructor(outerClassNames = []) {
    super({
      classNames: [...outerClassNames, 'code'],
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

  renderLevel() {
    console.log(String(this));
  }
}
