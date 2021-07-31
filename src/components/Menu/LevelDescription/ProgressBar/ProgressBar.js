import { MyComponent } from '@lib';
import './ProgressBar.scss';

export class ProgressBar extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames array of css class names
   * @property {Number} currentLevelIndex
   * @property {Number} levelsAmount
   */
  constructor({ classNames, currentLevelIndex, levelsAmount }) {
    super({
      classNames: [...classNames, 'progress-bar'],
    });

    this.bar = new MyComponent({
      classNames: ['progress-bar__bar'],
    });

    this.setBarWidth(currentLevelIndex, levelsAmount);

    this.appendChildren(this.bar);
  }

  setBarWidth(currentLevelIndex, levelsAmount) {
    this.bar.HTMLElement.style.width = `${
      ((currentLevelIndex + 1) / levelsAmount) * 100
    }%`;
  }
}
