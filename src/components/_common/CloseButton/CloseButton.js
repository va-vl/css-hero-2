import { Button } from '../Button/Button';
import './CloseButton.scss';

export class CloseButton extends Button {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames array of CSS class names
   * @param {Function[]} props.onClickCbs array of callbacks
   */
  constructor({ classNames = [], onClickCbs = [] } = {}) {
    super({
      classNames: [...classNames, 'close-button'],
      onClickCbs,
    });
  }
}
