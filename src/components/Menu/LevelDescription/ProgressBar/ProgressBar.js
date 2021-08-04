import { MyComponent } from '@lib';
import './ProgressBar.scss';

export class ProgressBar extends MyComponent {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames array of css class names
   */
  constructor({ classNames }) {
    super({
      classNames: [...classNames, 'progress-bar'],
    });

    this.bar = new MyComponent({
      classNames: ['progress-bar__bar'],
    });

    this.appendChildren(this.bar);
  }

  /**
   * @param {Object} props
   * @param {Number} props.currentLevelIndex
   * @param {Number} props.levelsAmount
   */
  render({ currentLevelIndex, levelsAmount }) {
    this.bar.HTMLElement.style.width = `${
      ((currentLevelIndex + 1) / levelsAmount) * 100
    }%`;
  }
}
