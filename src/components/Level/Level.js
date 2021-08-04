import { MyComponent } from '@lib';
import { Display } from './Display/Display';
import { Code } from './Code/Code';
import { createLevelVisualization } from './create-level-visualization';
import './Level.scss';

export class Level extends MyComponent {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames classNames from outer component
   * @param {Function} props.checkAnswerCb check answer
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
   * @param {Object} prop
   * @param {Object} props.currentLevel
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
