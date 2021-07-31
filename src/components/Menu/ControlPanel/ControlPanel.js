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
   * @property {Function} onBurgerButtonClickCb
   */
  constructor({
    classNames = [],
    currentLevelIndex,
    levelsAmount,
    onBurgerButtonClickCb,
  } = []) {
    super({
      classNames: [...classNames, 'control-panel'],
    });

    const prevButton = new NavButton({
      classNames: ['control-panel__button'],
      direction: 'prev',
      currentLevelIndex,
      levelsAmount,
    });

    const nextButton = new NavButton({
      classNames: ['control-panel__button'],
      direction: 'next',
      currentLevelIndex,
      levelsAmount,
    });

    this.navButtons = [prevButton, nextButton];

    this.burgerButton = new BurgerButton({
      classNames: ['control-panel__button'],
      direction: 'next',
      onClickCb: onBurgerButtonClickCb,
    });

    this.appendChildren(prevButton, nextButton, this.burgerButton);
  }
}
