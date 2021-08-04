import { MyComponent } from '@lib';
import './Button.scss';

export class Button extends MyComponent {
  /**
   * @param {Object} props button props
   * @param {String[]} props.classNames space-delimited list of CSS class names
   * @param {String} props.textContent button text
   * @param {Object.<string, (number | boolean | string | null)>} props.attrs button attributes
   * @param {Function[]} props.onClickCbs array of callbacks activated on each click
   */
  constructor({
    classNames = [],
    textContent,
    attrs = {},
    onClickCbs = [],
  } = {}) {
    super({
      tagName: 'button',
      classNames: [...classNames, 'button'],
      textContent,
      attrs,
    });

    this.onClickCallbacks = [
      () => {
        this.HTMLElement.blur();
      },
      ...onClickCbs,
    ];

    this.HTMLElement.onclick = () => {
      this.onClickCallbacks.forEach((cb) => {
        cb();
      });
    };
  }
}
