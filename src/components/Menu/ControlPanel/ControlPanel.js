import { MyComponent } from '@lib';
import { BurgerButton } from './BurgerButton/BurgerButton';
import './ControlPanel.scss';
import { NavButton } from './NavButton/NavButton';

export class ControlPanel extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames
   * @property {Number} currentLevelIndex
   * @property {Number} levelsAmount
   * @property {Function} onPrevButtonClickCb
   * @property {Function} onNextButtonClickCb
   * @property {Function} onBurgerButtonClickCb
   */
  constructor({
    classNames = [],
    currentLevelIndex,
    levelsAmount,
    onPrevButtonClickCb,
    onNextButtonClickCb,
    onBurgerButtonClickCb,
  } = []) {
    super({
      classNames: [...classNames, 'control-panel'],
    });

    this.prevButton = new NavButton({
      classNames: ['control-panel__button'],
      direction: 'prev',
      currentLevelIndex,
      levelsAmount,
      onClickCb: onPrevButtonClickCb,
    });

    this.nextButton = new NavButton({
      classNames: ['control-panel__button'],
      direction: 'next',
      currentLevelIndex,
      levelsAmount,
      onClickCb: onNextButtonClickCb,
    });

    this.burgerButton = new BurgerButton({
      classNames: ['control-panel__button'],
      direction: 'next',
      onClickCb: onBurgerButtonClickCb,
    });

    this.appendChildren(this.prevButton, this.nextButton, this.burgerButton);
  }
}
