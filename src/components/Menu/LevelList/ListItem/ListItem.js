import { MyComponent } from '@lib';
import { LEVEL_STATUSES, BLACK_STAR_CODE_POINT } from '@constants';
import './ListItem.scss';

export class ListItem extends MyComponent {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames array of css class names
   * @param {Object} props.level level data
   * @param {Number} props.index level index
   * @param {Function} props.onClickCb
   */
  constructor({ classNames, level, index, onClickCb }) {
    super({
      tagName: 'li',
      classNames: [...classNames, 'list-item'],
    });

    this.icon = new MyComponent({
      tagName: 'span',
      classNames: ['list-item__icon'],
      textContent: String.fromCodePoint(BLACK_STAR_CODE_POINT),
    });

    this.link = new MyComponent({
      tagName: 'a',
      classNames: ['list-item__link'],
      textContent: level.title,
      attrs: { href: '#' },
    });

    this.link.HTMLElement.onclick = () => {
      onClickCb(index);
    };

    this.appendChildren(this.icon, this.link);
  }

  /**
   * @param {Object} props
   * @param {Number} props.status level status
   * @param {Number} props.index level index
   * @param {Number} props.currentLevelIndex index of the level currently being played
   */
  render({ index, currentLevelIndex, status }) {
    if (index === currentLevelIndex) {
      this.addClasses(['list-item--current']);
      this.link.addClasses(['list-item__link--disabled']);
    } else {
      this.removeClasses(['list-item--current']);
      this.link.removeClasses(['list-item__link--disabled']);
    }

    switch (status) {
      case LEVEL_STATUSES.SOLVED: {
        this.icon.addClasses(['list-item__icon--solved']);
        this.icon.removeClasses(['list-item__icon--assisted']);
        break;
      }
      case LEVEL_STATUSES.ASSISTED: {
        this.icon.addClasses(['list-item__icon--assisted']);
        this.icon.removeClasses(['list-item__icon--solved']);
        break;
      }
      case LEVEL_STATUSES.NOT_SOLVED:
      default: {
        this.icon.removeClasses([
          'list-item__icon--solved',
          'list-item__icon--assisted',
        ]);
      }
    }
  }
}
