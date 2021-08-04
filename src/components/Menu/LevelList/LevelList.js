import { MyComponent } from '@lib';
import { KeyButton } from '@components/common';
import { ListItem } from './ListItem/ListItem';
import './LevelList.scss';

export class LevelList extends MyComponent {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames classNames from outer component
   * @param {Object[]} props.levels
   * @param {Function} props.onTransitionEndCb
   * @param {Function} props.onLevelLinkClickCb
   * @param {Function} props.onResetButtonClickCb
   */
  constructor({
    classNames,
    levels,
    onTransitionEndCb,
    onLevelLinkClickCb,
    onResetButtonClickCb,
  }) {
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
      (level, index) =>
        new ListItem({
          classNames: ['level-list__list-item'],
          onClickCb: onLevelLinkClickCb,
          level,
          index,
        })
    );

    list.appendChildren(...this.listItems);

    const resetButton = new KeyButton({
      classNames: ['level-list__reset-button'],
      textContent: 'Reset all progress',
      onClickCbs: [
        () => {
          onResetButtonClickCb();
        },
      ],
    });

    this.HTMLElement.ontransitionend = onTransitionEndCb;

    this.appendChildren(heading, list, resetButton);
  }

  /**
   * @param {Object} props
   * @param {Number} props.currentLevelIndex
   * @param {Object[]} props.levels
   */
  render({ levels, currentLevelIndex }) {
    this.listItems.forEach((listItem, index) => {
      listItem.render({
        index,
        currentLevelIndex,
        status: levels[index].status,
      });
    });
  }
}
