import CodeMirror from 'codemirror';
import { KeyButton } from '@components/common';
import { MyComponent } from '@lib';
import './Input.scss';

const WIDTH_VALUE = '100px';

const refreshCodeMirror = (cm) => {
  const cmDisplaySizer = cm.display.sizer;

  cmDisplaySizer.style.minWidth = WIDTH_VALUE;
  cmDisplaySizer.style.maxWidth = WIDTH_VALUE;
  cmDisplaySizer.style.width = WIDTH_VALUE;
  cm.refresh();
};

export class Input extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames
   * @property {Function} checkAnswerCb
   */
  constructor({ classNames = [], checkAnswerCb } = {}) {
    super({
      classNames: [...classNames, 'input'],
    });

    const textArea = new MyComponent({
      tagName: 'textarea',
      classNames: ['input__textarea'],
      attrs: {
        placeholder: 'Enter a CSS selector',
      },
    });

    this.enterButton = new KeyButton({
      classNames: ['input__enter-button'],
      textContent: 'Enter',
    });

    this.enterButton.HTMLElement.onclick = () => {
      checkAnswerCb(this.codeMirror.getValue());
    };

    this.appendChildren(textArea, this.enterButton);

    this.codeMirror = CodeMirror.fromTextArea(textArea.HTMLElement, {
      mode: 'css',
      showCursorWhenSelecting: true,
      scrollbarStyle: null,
    });

    this.codeMirror.on('keydown', (_, event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    });

    this.codeMirror.on('keyup', (cm, event) => {
      if (event.key === 'Enter') {
        checkAnswerCb(cm.getValue());
      }
    });

    setTimeout(() => {
      refreshCodeMirror(this.codeMirror);
      this.codeMirror.focus();
    });
  }

  render() {
    this.codeMirror.setValue('');
    this.codeMirror.refresh();
    this.codeMirror.focus();
  }
}
