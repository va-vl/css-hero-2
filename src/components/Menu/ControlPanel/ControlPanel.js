import { MyComponent } from '@lib';
import { BurgerButton } from './BurgerButton/BurgerButton';
import { NavButton } from './NavButton/NavButton';
import './ControlPanel.scss';

export class ControlPanel extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames
   * @property {Function} onBurgerButtonClickCb
   */
  constructor({ classNames = [], levelsAmount, onBurgerButtonClickCb } = {}) {
    super({
      classNames: [...classNames, 'control-panel'],
    });

    this.prevButton = new NavButton({
      classNames: ['control-panel__button'],
      direction: 'prev',
      levelsAmount,
    });

    this.nextButton = new NavButton({
      classNames: ['control-panel__button'],
      direction: 'next',
      levelsAmount,
    });

    const burgerButton = new BurgerButton({
      classNames: ['control-panel__button'],
      onClickCb: onBurgerButtonClickCb,
    });

    this.appendChildren(this.prevButton, this.nextButton, burgerButton);
  }

  /**
   * @param {Object} props
   * @property {Number} levelsAmount
   * @property {Number} currentLevelIndex
   * @property {Function} onNavButtonClickCb
   */
  render({ levelsAmount, currentLevelIndex, onNavButtonClickCb }) {
    this.prevButton.render({
      levelsAmount,
      currentLevelIndex,
      onClickCb: () => {
        onNavButtonClickCb(currentLevelIndex - 1);
      },
    });

    this.nextButton.render({
      levelsAmount,
      currentLevelIndex,
      onClickCb: () => {
        onNavButtonClickCb(currentLevelIndex + 1);
      },
    });
  }
}
