import { MyComponent } from '@lib';
import './LevelList.scss';

export class LevelList extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   * @param {Function} changeLevelCb callback for level change
   * @param {Function} resetProgressCb callback for progress reset
   */
  constructor(outerClassNames /* , changeLevelCb, resetProgressCb */) {
    super({
      classNames: [...outerClassNames, 'level-list'],
    });
  }
}
