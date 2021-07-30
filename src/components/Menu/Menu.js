import { MyComponent } from '@lib';
import { LevelDescription } from './LevelDescription/LevelDescription';
import { LevelList } from './LevelList/LevelList';
import './Menu.scss';

export class Menu extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   * @param {Model} model interface for state access
   */
  constructor(outerClassNames /* model */) {
    super({
      classNames: [...outerClassNames, 'menu'],
    });

    // const { currentLevelIndex, currentLevel, levels } = model.getLevelData();

    const levelDescription = new LevelDescription(['menu__level-description']);
    const levelList = new LevelList(['menu__level-list']);

    this.appendChildren(levelDescription, levelList);
  }
}
