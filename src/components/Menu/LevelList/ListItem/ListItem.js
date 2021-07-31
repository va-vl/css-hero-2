import { MyComponent } from '@lib';
import './ListItem.scss';

const BLACK_STAR_CODE_POINT = 9733;

export class ListItem extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames array of css class names
   * @property {Object} level level data
   * @property {Number} index level index
   * @property {Number} currentLevelIndex index of the level currently being played
   */
  constructor({ classNames, level, index, currentLevelIndex }) {
    super({
      tagName: 'li',
      classNames: [...classNames, 'list-item'],
    });

    this.index = index;

    if (this.checkIsCurrent(currentLevelIndex)) {
      this.addClasses(['list-item--current']);
    }

    this.icon = new MyComponent({
      tagName: 'span',
      classNames: ['list-item__icon'],
      textContent: String.fromCodePoint(BLACK_STAR_CODE_POINT),
    });

    const link = new MyComponent({
      tagName: 'a',
      classNames: ['list-item__link'],
      textContent: level.title,
      attrs: { href: '#' },
    });

    this.appendChildren(this.icon, link);
  }

  checkIsCurrent(currentLevelIndex) {
    return this.index === currentLevelIndex;
  }
}
