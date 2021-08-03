import { MyComponent } from '@lib';
import { Display } from './Display/Display';
import { Code } from './Code/Code';
import { createLevelVisualization } from './create-level-visualization';
import './Level.scss';

export class Level extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames classNames from outer component
   * @property {Function} checkAnswerCb check answer
   */
  constructor({ classNames = [], checkAnswerCb } = {}) {
    super({
      classNames: [...classNames, 'level'],
    });

    this.currentLevelIndex = null;
    this.display = new Display({ classNames: ['level__display'] });
    this.code = new Code({ classNames: ['level__code'], checkAnswerCb });

    this.appendChildren(this.display, this.code);
  }

  /**
   * Render if level was changed
   * @param {Object} prop
   * @property {Object} currentLevel
   * @returns {void}
   */
  render({ currentLevel }) {
    const [iconLevelFragment, codeLevelFragment] =
      createLevelVisualization(currentLevel);

    this.display.render({
      title: currentLevel.title,
      iconLevelFragment,
    });

    this.code.render({ codeLevelFragment });
  }
}
