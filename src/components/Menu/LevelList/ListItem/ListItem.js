import { MyComponent } from '@lib';
import './ListItem.scss';

const BLACK_STAR_CODE_POINT = 9733;

export class ListItem extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames array of css class names
   * @property {Object} level level data
   */
  constructor({ classNames, level }) {
    super({
      tagName: 'li',
      classNames: [...classNames, 'list-item'],
    });

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

  /**
   * @param {Object} props
   * @property {Object} level level data
   * @property {Number} index level index
   * @property {Number} currentLevelIndex index of the level currently being played
   * @property {Function} onClickCb
   */
  render({ index, currentLevelIndex, level, onClickCb }) {
    if (index === currentLevelIndex) {
      this.addClasses(['list-item--current']);
    } else {
      this.removeClasses(['list-item--current']);
    }

    this.HTMLElement.onclick = (event) => {
      if (index !== currentLevelIndex) {
        event.preventDefault();
        onClickCb(index);
      }
    };

    const { status } = level;

    switch (status) {
      case 2: {
        this.icon.addClasses(['list-item__icon--solved']);
        this.icon.removeClasses(['list-item__icon--assisted']);
        break;
      }
      case 1: {
        this.icon.addClasses(['list-item__icon--assisted']);
        this.icon.removeClasses(['list-item__icon--solved']);
        break;
      }
      case 0:
      default: {
        this.icon.removeClasses([
          'list-item__icon--solved',
          'list-item__icon--assisted',
        ]);
      }
    }
  }
}
