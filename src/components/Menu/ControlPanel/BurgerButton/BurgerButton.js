import { Button } from '@components/common';
import { MyComponent } from '@lib';
import './BurgerButton.scss';

export class BurgerButton extends Button {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames
   * @param {Function} props.onClickCb
   */
  constructor({ classNames = [], onClickCb } = {}) {
    super({
      classNames: [...classNames, 'button__burger'],
      onClickCbs: [
        () => {
          if (onClickCb()) {
            this.toggleClasses(['button__burger--open']);
          }
        },
      ],
    });

    this.appendChildren(
      new MyComponent({
        classNames: ['button__burger-dash'],
      })
    );
  }
}
