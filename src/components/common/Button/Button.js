import './Button.scss';
import { MyComponent } from '@lib';

export class Button extends MyComponent {
  /**
   * @param {String} classNames space-delimited list of CSS class names
   * @param {String} textContent button text
   * @param {Object.<string, (number | boolean | string | null)>} attrs button attributes
   */
  constructor({ classNames, textContent, attrs } = {}) {
    super({
      tagName: 'button',
      classNames: `${classNames} button`,
      textContent,
      attrs,
    });

    this.HTMLElement.onclick = () => {
      this.handleClick();
    };
  }

  handleClick() {
    this.blur();
  }
}
