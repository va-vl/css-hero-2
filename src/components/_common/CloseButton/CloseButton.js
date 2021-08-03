import { Button } from '../Button/Button';
import './CloseButton.scss';

export class CloseButton extends Button {
  constructor({ classNames = [] } = {}) {
    super({
      classNames: [...classNames, 'close-button'],
    });
  }
}
