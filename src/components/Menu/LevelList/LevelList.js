import { MyComponent } from '@lib';
import { KeyButton } from '@components/common';
import { ListItem } from './ListItem/ListItem';
import './LevelList.scss';

export class LevelList extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames classNames from outer component
   * @property {Number} currentLevelIndex
   * @property {Object[]} levels
   * @property {Function} onTransitionEndCb
   */
  constructor({ classNames, currentLevelIndex, levels, onTransitionEndCb }) {
    super({
      tagName: 'nav',
      classNames: [...classNames, 'level-list'],
    });

    const heading = new MyComponent({
      tagName: 'h3',
      classNames: ['level-list__heading'],
      textContent: 'Level list',
    });

    this.list = new MyComponent({
      tagName: 'ol',
      classNames: ['level-list__list'],
      children: levels.map(
        (level, index) =>
          new ListItem({
            classNames: ['level-list__list-item'],
            level,
            index,
            currentLevelIndex,
          })
      ),
    });

    const resetButton = new KeyButton({
      classNames: ['level-list__reset-button'],
      textContent: 'Reset all progress',
    });

    this.HTMLElement.ontransitionend = onTransitionEndCb;

    this.appendChildren(heading, this.list, resetButton);
  }
}
