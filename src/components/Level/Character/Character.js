import { MyComponent } from '@lib';
import { highlight } from '../../../utils';
import './Character.scss';

export class Character {
  /**
   * Creates an html element and text representation of a character & binds them together
   * @param {Object} charProps properties of a character
   * @property {String} tagName character HTML tag name
   * @property {String[]} classNames character CSS classes
   * @property {Object<string, (string | number | boolean | void)>} attrs character HTML attributes
   * @property {Character[]} children nested characters
   */
  constructor(charProps) {
    this.createLevelDisplayIcon(charProps);
    this.createCodeText(charProps);
    this.createToolTip();

    this.characterCode = new MyComponent({
      classNames: ['char__code-text'],
    }).HTMLElement;

    this.characterIcon.addEventListener('mouseover', (event) => {
      this.handleHoverEvents(event, this.characterIcon);
    });

    this.characterIcon.addEventListener('mouseout', (event) => {
      this.handleHoverEvents(event, this.characterIcon);
    });

    this.characterCode.addEventListener('mouseover', (event) => {
      this.handleHoverEvents(event, this.characterCode);
    });

    this.characterCode.addEventListener('mouseout', (event) => {
      this.handleHoverEvents(event, this.characterCode);
    });
  }

  createLevelDisplayIcon({ tagName, classNames, attrs }) {
    let str = `<${tagName} `;

    if (classNames) {
      str += Character.createClassNamesString(classNames);
    }

    if (attrs) {
      str += Character.createAttrsString(attrs);
    }

    str += `></${tagName}>`;

    const div = new MyComponent().HTMLElement;
    div.innerHTML = str;

    this.characterIcon = div.firstElementChild;
  }

  createCodeText({ tagName, classNames, attrs, children }) {
    let str = `${tagName}`;

    if (classNames) {
      str += Character.createClassNamesString(classNames);
    }

    if (attrs) {
      str += Character.createClassNamesString(classNames);
    }

    if (children) {
      this.openingTag = highlight(`<${str}>`);
      this.closingTag = highlight(`</${tagName}>`);
    } else {
      this.openingTag = highlight(`<${str} />`);
    }
  }

  createToolTip() {
    this.toolTip = new MyComponent({
      classNames: ['char__tooltip'],
    }).HTMLElement;
    this.toolTip.insertAdjacentHTML('afterBegin', this.openingTag);

    if (this.closingTag) {
      this.toolTip.insertAdjacentHTML('beforeEnd', this.closingTag);
    }
  }

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

  static createClassNamesString(classNames) {
    return ` class="${classNames.join(' ')}"`;
  }

  static createAttrsString(attrs) {
    return Object.entries(attrs).reduce(
      (result, [attr, value]) => `${result} ${attr}=${value}`,
      ''
    );
  }
}
