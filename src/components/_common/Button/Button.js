import { MyComponent } from '@lib';
import './Button.scss';

export class Button extends MyComponent {
  /**
   * @param {Object} props button props
   * @param {String[]} props.classNames space-delimited list of CSS class names
   * @param {String} props.textContent button text
   * @param {Object.<string, (number | boolean | string | null)>} props.attrs button attributes
   */
  constructor({ classNames, textContent, attrs } = {}) {
    super({
      tagName: 'button',
      classNames: [...classNames, 'button'],
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
