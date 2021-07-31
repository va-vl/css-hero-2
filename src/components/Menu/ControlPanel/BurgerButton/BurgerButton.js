import { Button } from '@components/common';
import { MyComponent } from '@lib';
import './BurgerButton.scss';

export class BurgerButton extends Button {
  /**
   * @param {Object} props
   * @property {String[]} classNames
   * @property {Function} onClickCb
   */
  constructor({ classNames, onClickCb }) {
    super({
      classNames: [...classNames, 'button__burger'],
    });

    const burgerDash = new MyComponent({
      classNames: ['button__burger-dash'],
    });

    this.appendChildren(burgerDash);

    this.HTMLElement.addEventListener('click', () => {
      if (onClickCb()) {
        this.toggleClasses(['button__burger--open']);
      }
    });
  }
}
