import './KeyButton.scss';
import { Button } from '../Button/Button';

export class KeyButton extends Button {
  /**
   * @param {String} classNames space-delimited list of CSS class names
   * @param {String} textContent button text
   */
  constructor({ classNames, textContent }) {
    super({
      classNames: `${classNames} button__key`,
      textContent,
    });
  }
}
