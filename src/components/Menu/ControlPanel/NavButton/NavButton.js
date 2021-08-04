import { Button } from '@components/common';
import { NAV_BUTTON_DIRECTIONS } from '@constants';

export class NavButton extends Button {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames
   * @param {String} props.direction navigation direction
   * @param {Function} props.onClickCb
   */
  constructor({ classNames, direction, onClickCb }) {
    super({
      classNames: [...classNames],
      textContent: String.fromCodePoint(
        NAV_BUTTON_DIRECTIONS[direction]?.iconCodePoint ||
          NAV_BUTTON_DIRECTIONS.default.iconCodePoint
      ),
      onClickCbs: [onClickCb],
    });

    this.direction = direction;
  }

  /**
   * @param {Object} props
   * @param {Number} props.currentLevelIndex
   * @param {Number} props.levelsAmount
   */
  render({ levelsAmount, currentLevelIndex }) {
    const prevAtStart = currentLevelIndex === 0 && this.direction === 'prev';
    const nextAtEnd =
      currentLevelIndex + 1 === levelsAmount && this.direction === 'next';

    if (prevAtStart || nextAtEnd) {
      this.setAttrs({ disabled: 'true' });
    } else {
      this.removeAttrs(['disabled']);
    }
  }
}
