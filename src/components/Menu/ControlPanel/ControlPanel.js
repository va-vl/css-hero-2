import { MyComponent } from '@lib';
import { BurgerButton } from './BurgerButton/BurgerButton';
import { NavButton } from './NavButton/NavButton';
import './ControlPanel.scss';

export class ControlPanel extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames
   * @property {Function} onBurgerButtonClickCb
   * @property {Function} onPrevButtonClickCb
   * @property {Function} onNextButtonClickCb
   */
  constructor({
    classNames = [],
    levelsAmount,
    onBurgerButtonClickCb,
    onPrevButtonClickCb,
    onNextButtonClickCb,
  } = {}) {
    super({
      classNames: [...classNames, 'control-panel'],
    });

    this.prevButton = new NavButton({
      classNames: ['control-panel__button'],
      direction: 'prev',
      levelsAmount,
      onClickCb: () => {
        onPrevButtonClickCb();
      },
    });

    this.nextButton = new NavButton({
      classNames: ['control-panel__button'],
      direction: 'next',
      levelsAmount,
      onClickCb: () => {
        onNextButtonClickCb();
      },
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
   */
  render({ levelsAmount, currentLevelIndex }) {
    this.prevButton.render({
      levelsAmount,
      currentLevelIndex,
    });

    this.nextButton.render({
      levelsAmount,
      currentLevelIndex,
    });
  }
}
