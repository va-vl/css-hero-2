import { createCharacterComponents } from './create-character-components';
import './Character.scss';

export class Character {
  /**
   * Creates an html element and text representation of a character & binds them together
   * @param {Object} charProps properties of a character
   * @param {String} charProps.tagName character HTML tag name
   * @param {String[]} charProps.classNames character CSS classes
   * @param {Object<string, (string | number | boolean | void)>} charProps.attrs character HTML attributes
   * @param {Object[]} charProps.children nested characters as childProps array
   */
  constructor(charProps) {
    [
      this.characterIcon,
      this.characterCode,
      this.toolTip,
      this.openingTagString,
      this.closingTagString,
    ] = createCharacterComponents(charProps, {
      codeContainerClassNames: ['char__code'],
      toolTipClassNames: ['char__tooltip'],
    });

    this.characterIcon.onmouseover = (event) => {
      this.handleHoverEvents(event, this.characterIcon);
    };

    this.characterIcon.onmouseout = (event) => {
      this.handleHoverEvents(event, this.characterIcon);
    };

    this.characterCode.onmouseover = (event) => {
      this.handleHoverEvents(event, this.characterCode);
    };

    this.characterCode.onmouseout = (event) => {
      this.handleHoverEvents(event, this.characterCode);
    };
  }

  /**
   * @param {String} event event name
   * @param {HTMLElement} elem
   */
  handleHoverEvents(event, elem) {
    const highlightHandlers = {
      mouseover: () => this.showHover(),
      mouseout: () => this.removeHover(),
    };

    const isIcon =
      elem === this.characterIcon && event.target === this.characterIcon;

    const isDiv = elem === this.characterCode;

    event.stopPropagation();

    if (isDiv || isIcon) {
      highlightHandlers[event.type]();
    }
  }

  showHover() {
    const { top, right } = this.characterIcon.getBoundingClientRect();

    this.characterIcon.classList.add('char--hover');
    this.characterCode.classList.add('char__code--hover');

    this.toolTip.style = `position: fixed; top: ${top - 20}px; left: ${
      right + 10
    }px;`;

    document.body.append(this.toolTip);
  }

  removeHover() {
    this.characterIcon.classList.remove('char--hover');
    this.characterCode.classList.remove('char__code--hover');
    this.toolTip.remove();
    this.toolTip.style = '';
  }
}
