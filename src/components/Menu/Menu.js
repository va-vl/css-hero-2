import { MyComponent } from '@lib';
import { LevelDescription } from './LevelDescription/LevelDescription';
import { LevelList } from './LevelList/LevelList';
import './Menu.scss';

export class Menu extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   * @param {Model} model interface for state access
   */
  constructor(outerClassNames /* , model */) {
    super({
      classNames: [...outerClassNames, 'menu'],
    });

    const levelDescription = new LevelDescription();
    const levelList = new LevelList();

    this.appendChildren(levelDescription, levelList);
  }
}
