import { MyComponent } from '@lib';
import { ProgressBar } from './ProgressBar/ProgressBar';
import './LevelDescription.scss';

export class LevelDescription extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames array of css class names
   * @property {Object} currentLevel
   * @property {Number} currentLevelIndex
   * @property {Number} levelsAmount
   */
  constructor({ classNames, currentLevel, currentLevelIndex, levelsAmount }) {
    super({
      classNames: [...classNames, 'level-description'],
    });

    this.heading = new MyComponent({
      tagName: 'h3',
      classNames: ['level-description__heading'],
      textContent: `Lvl ${currentLevelIndex + 1} of ${levelsAmount}`,
    });

    this.progressBar = new ProgressBar({
      classNames: ['level-description__progress-bar'],
      currentLevelIndex,
      levelsAmount,
    });

    this.description = new MyComponent({
      classNames: ['level-description__text'],
    });
    this.description.setInnerHTML('afterbegin', currentLevel.description);

    this.appendChildren(this.heading, this.progressBar, this.description);
  }
}
