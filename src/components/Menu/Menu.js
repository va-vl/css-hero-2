import { MyComponent } from '@lib';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { LevelDescription } from './LevelDescription/LevelDescription';
import { LevelList } from './LevelList/LevelList';
import './Menu.scss';

export class Menu extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames classNames from outer component
   * @property {Number} currentLevelIndex
   * @property {Object} currentLevel current level object
   * @property {Object[]} levels array of all levels
   */
  constructor({
    classNames = [],
    currentLevelIndex,
    currentLevel,
    levels,
  } = {}) {
    super({
      classNames: [...classNames, 'menu'],
    });

    this.isMoving = false;

    const { length: levelsAmount } = levels;

    const controlPanel = new ControlPanel({
      classNames: ['menu__control-panel'],
      currentLevelIndex,
      levelsAmount,
      onBurgerButtonClickCb: () => {
        if (this.isMoving) {
          return false;
        }

        this.toggleClasses(['menu--list']);
        this.isMoving = true;
        return true;
      },
    });

    const levelDescription = new LevelDescription({
      classNames: ['menu__level-description'],
      currentLevel,
      currentLevelIndex,
      levelsAmount,
    });

    const levelList = new LevelList({
      classNames: ['menu__level-list'],
      currentLevelIndex,
      levels,
      onTransitionEndCb: () => {
        this.isMoving = false;
      },
    });

    const menuWrapper = new MyComponent({
      classNames: ['menu__wrapper'],
      children: [controlPanel, levelDescription, levelList],
    });

    this.appendChildren(menuWrapper);
  }
}
