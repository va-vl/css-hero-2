import { MyComponent } from '@lib';
import { CloseButton } from '@components/common';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { LevelDescription } from './LevelDescription/LevelDescription';
import { LevelList } from './LevelList/LevelList';
import './Menu.scss';

export class Menu extends MyComponent {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames classNames from outer component
   * @param {String} props.menuActiveClassName
   * @param {Function} props.setLevelCb callback that changes a level
   * @param {Function} props.setPrevLevelCb callback that changes a level
   * @param {Function} props.setNextLevelCb callback that changes a level
   * @param {Function} props.resetProgressCb callback that changes a level
   */
  constructor({
    classNames = [],
    levels,
    menuActiveClassName,
    setLevelCb,
    setPrevLevelCb,
    setNextLevelCb,
    resetProgressCb,
  } = {}) {
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
      onPrevButtonClickCb: setPrevLevelCb,
      onNextButtonClickCb: setNextLevelCb,
      onBurgerButtonClickCb,
    });

    this.levelDescription = new LevelDescription({
      classNames: ['menu__level-description'],
    });

    this.levelList = new LevelList({
      classNames: ['menu__level-list'],
      levels,
      onLevelLinkClickCb: setLevelCb,
      onResetButtonClickCb: resetProgressCb,
      onTransitionEndCb: onLevelListTransitionEndCb,
    });

    const closeButton = new CloseButton({
      classNames: ['menu__close-button'],
      onClickCbs: [
        () => {
          this.removeClasses([menuActiveClassName]);
        },
      ],
    });

    this.appendChildren(
      new MyComponent({
        classNames: ['menu__wrapper'],
        children: [this.controlPanel, this.levelDescription, this.levelList],
      }),
      closeButton
    );
  }

  /**
   * @param {Object} props
   * @param {Number} props.currentLevelIndex
   * @param {Object} props.currentLevel current level object
   * @param {Object[]} props.levels array of all levels
   */
  render({ currentLevelIndex, currentLevel, levels }) {
    this.controlPanel.render({
      currentLevelIndex,
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
    });
  }
}
