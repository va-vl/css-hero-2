import { MyComponent } from '@lib';
import './CodeContainer.scss';

export class CodeContainer extends MyComponent {
  /**
   * @param {Object} props code container props
   * @property {String[]} classNames a list of css class names
   * @property
   */
  constructor({ classNames = [], title, fileName, type, maxCodeLines } = {}) {
    super({
      classNames: [...classNames, 'code-container', `code-container--${type}`],
    });

    const header = new MyComponent({
      classNames: ['code-container__header'],
      children: [
        new MyComponent({
          tagName: 'p',
          classNames: ['code-container-title'],
          textContent: title,
        }),
        new MyComponent({
          tagName: 'p',
          classNames: ['code-container__file-name'],
          textContent: fileName,
        }),
      ],
    });

    const lineCount = new MyComponent({
      classNames: ['code-container__line-count'],
      children: Array.from({ length: maxCodeLines }).map(
        (_, index) => new MyComponent({ tagName: 'p', textContent: index + 1 })
      ),
    });
    this.main = new MyComponent({
      tagName: 'main',
      classNames: ['code-container__main'],
    });

    const mainWrapper = new MyComponent({
      classNames: ['code-container__main-wrapper'],
      children: [lineCount, this.main],
    });

    this.appendChildren(header, mainWrapper);
  }

  clearMainContent() {
    this.main.clearContent();
  }

  /**
   * @param {...(HTMLElement|MyComponent)[]} children array of main content elements
   */
  setMainContent(...children) {
    this.clearMainContent();
    this.appendMainContent(...children);
  }

  /**
   * @param {...(HTMLElement|MyComponent)[]} children array of main content elements
   */
  appendMainContent(...children) {
    this.main.appendChildren(...children);
  }

  /**
   * @param {position} string
   * @param {String} HTMLString
   */
  appendMainInnerHTML(position, HTMLString) {
    this.main.appendInnerHTML(position, HTMLString);
  }
}
