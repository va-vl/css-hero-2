import { MyComponent } from '@lib';
import { KeyButton } from '@components/common';
import { ListItem } from './ListItem/ListItem';
import './LevelList.scss';

export class LevelList extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames classNames from outer component
   * @property {Object[]} levels
   * @property {Function} onTransitionEndCb
   */
  constructor({ classNames, levels, onTransitionEndCb }) {
    super({
      tagName: 'nav',
      classNames: [...classNames, 'level-list'],
    });

    const heading = new MyComponent({
      tagName: 'h3',
      classNames: ['level-list__heading'],
      textContent: 'Level list',
    });

    const list = new MyComponent({
      tagName: 'ol',
      classNames: ['level-list__list'],
    });

    this.listItems = levels.map(
      (level) =>
        new ListItem({
          classNames: ['level-list__list-item'],
          level,
        })
    );

    list.appendChildren(...this.listItems);

    const resetButton = new KeyButton({
      classNames: ['level-list__reset-button'],
      textContent: 'Reset all progress',
    });

    this.HTMLElement.ontransitionend = onTransitionEndCb;

    this.appendChildren(heading, list, resetButton);
  }

  /**
   * @param {Object} props
   * @property {Number} currentLevelIndex
   * @property {Object[]} levels
   * @property {Function} onLevelLinkClickCb
   */
  render({ levels, currentLevelIndex, onLevelLinkClickCb }) {
    this.listItems.forEach((listItem, index) => {
      listItem.render({
        index,
        currentLevelIndex,
        level: levels[index],
        onClickCb: onLevelLinkClickCb,
      });
    });
  }
}
