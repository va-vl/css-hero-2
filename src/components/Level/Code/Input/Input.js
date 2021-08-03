import CodeMirror from 'codemirror';
import { KeyButton } from '@components/common';
import { MyComponent } from '@lib';
import { refreshCodeMirror } from './refresh-code-mirror';
import './Input.scss';

export class Input extends MyComponent {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames
   * @param {Function} props.checkAnswerCb
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
      onClickCbs: [
        () => {
          checkAnswerCb(this.codeMirror.getValue());
        },
      ],
    });

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
