import { Button } from '@components/common';

const DIRECTION_ICON_CODE_POINTS = {
  prev: 9756,
  next: 9758,
};

const DEFAULT_ICON_CODE_POINT = 9760;

export class NavButton extends Button {
  /**
   * @param {Object} props
   * @property {String[]} classNames
   * @property {String} direction navigation direction
   * @property {Number} currentLevelIndex
   * @property {Number} levelsAmount
   * @property {Function} onClickCb
   */
  constructor({
    classNames,
    direction,
    currentLevelIndex,
    levelsAmount,
    onClickCb,
  }) {
    super({
      classNames: [...classNames],
      textContent: String.fromCodePoint(
        DIRECTION_ICON_CODE_POINTS[direction] || DEFAULT_ICON_CODE_POINT
      ),
    });

    this.direction = direction;

    this.HTMLElement.addEventListener('click', onClickCb);

    this.handleDisabledAttr(currentLevelIndex, levelsAmount);
  }

  handleDisabledAttr(currentLevelIndex, levelsAmount) {
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
