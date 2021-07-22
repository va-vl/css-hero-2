import { MyComponent } from '@lib';
import './LevelDisplay.scss';

export class LevelDisplay extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   */
  constructor(outerClassNames) {
    super({
      classNames: [...outerClassNames, 'level-display'],
      textContent: 'level display placeholder',
    });
  }
}
