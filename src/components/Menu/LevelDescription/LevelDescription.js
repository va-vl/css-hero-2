import { MyComponent } from '@lib';
import { ProgressBar } from './ProgressBar/ProgressBar';
import './LevelDescription.scss';

export class LevelDescription extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames array of css class names
   */
  constructor({ classNames }) {
    super({
      classNames: [...classNames, 'level-description'],
    });

    this.heading = new MyComponent({
      tagName: 'h3',
      classNames: ['level-description__heading'],
    });

    this.progressBar = new ProgressBar({
      classNames: ['level-description__progress-bar'],
    });

    this.description = new MyComponent({
      classNames: ['level-description__text'],
    });

    this.appendChildren(this.heading, this.progressBar, this.description);
  }

  /**
   * @param {*} props
   * @property {Object} currentLevel
   * @property {Number} currentLevelIndex
   * @property {Number} levelsAmount
   */
  render({ currentLevel, currentLevelIndex, levelsAmount }) {
    this.heading.setTextContent(
      `Lvl ${currentLevelIndex + 1} of ${levelsAmount}`
    );
    this.progressBar.render({ currentLevelIndex, levelsAmount });
    this.description.setInnerHTML('afterbegin', currentLevel.description);
  }
}
