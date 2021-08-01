import { MyComponent } from '@lib';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { LevelDescription } from './LevelDescription/LevelDescription';
import { LevelList } from './LevelList/LevelList';
import './Menu.scss';

export class Menu extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames classNames from outer component
   */
  constructor({ classNames = [], levels } = {}) {
    super({
      classNames: [...classNames, 'menu'],
    });

    this.isMoving = false;
    this.levelsAmount = levels.length;

    const onBurgerButtonClickCb = () => {
      if (this.isMoving) {
        return false;
      }

      this.toggleClasses(['menu--list']);
      this.isMoving = true;
      return true;
    };

    const onLevelListTransitionEndCb = () => {
      this.isMoving = false;
    };

    this.controlPanel = new ControlPanel({
      classNames: ['menu__control-panel'],
      onBurgerButtonClickCb,
    });

    this.levelDescription = new LevelDescription({
      classNames: ['menu__level-description'],
    });

    this.levelList = new LevelList({
      classNames: ['menu__level-list'],
      onTransitionEndCb: onLevelListTransitionEndCb,
      levels,
    });

    this.appendChildren(
      new MyComponent({
        classNames: ['menu__wrapper'],
        children: [this.controlPanel, this.levelDescription, this.levelList],
      })
    );
  }

  /**
   * @param {Object} props
   * @property {Number} currentLevelIndex
   * @property {Object} currentLevel current level object
   * @property {Object[]} levels array of all levels
   * @property {Function} setLevelCb callback that changes a level
   */
  render({ currentLevelIndex, currentLevel, levels, setLevelCb }) {
    this.controlPanel.render({
      currentLevelIndex,
      onNavButtonClickCb: setLevelCb,
      levelsAmount: this.levelsAmount,
    });

    this.levelDescription.render({
      currentLevel,
      currentLevelIndex,
      levelsAmount: this.levelsAmount,
    });

    this.levelList.render({
      levels,
      currentLevelIndex,
      onLevelLinkClickCb: setLevelCb,
    });
  }
}
