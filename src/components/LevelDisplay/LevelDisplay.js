import { MyComponent } from '@lib';
import './LevelDisplay.scss';

export class LevelDisplay extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   * @param {object} store application state store
   */
  constructor(outerClassNames, store) {
    super({
      classNames: [...outerClassNames, 'level-display'],
      textContent: 'level display placeholder',
    });
    console.log('level display: ', store);
  }
}
