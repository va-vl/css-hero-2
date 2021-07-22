import { Button } from '../Button/Button';
import './KeyButton.scss';

export class KeyButton extends Button {
  /**
   * @param {Object} props button props
   * @param {String} props.classNames space-delimited list of CSS class names
   * @param {String} props.textContent button text
   */
  constructor({ classNames, textContent } = {}) {
    super({
      classNames: `${classNames} button__key`,
      textContent,
    });
  }
}
