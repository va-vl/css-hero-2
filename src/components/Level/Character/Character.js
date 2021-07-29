// import { MyComponent } from '@lib';
import { highlight } from '../../../utils';

const PAIRED_TAGS = ['wolf', 'boar'];

class Character {
  constructor(obj) {
    this.createDisplayIcon(obj);
    this.createCodeText(obj);
    this.createToolTip();

    this.characterCode = Element.DOM({ classNames: 'char__html' });

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

  createDisplayIcon(obj) {
    let str = `<${obj.element} class="${obj.className || ''}${
      obj.target ? ' target' : ''
    }"`;
    str = Character.addParam(obj, 'id', str);
    str = Character.addParam(obj, 'color', str);
    str += `></${obj.element}>`;

    const div = Element.DOM();
    div.innerHTML = str;
    this.characterIcon = div.firstElementChild;
  }

  createCodeText(obj) {
    let str = `${obj.element}`;
    str = Character.addParam(obj, 'className', str);
    str = Character.addParam(obj, 'id', str);
    str = Character.addParam(obj, 'color', str);

    if (PAIRED_TAGS.includes(obj.element)) {
      this.openingTag = highlight(`<${str}>`);
      this.closingTag = highlight(`</${obj.element}>`);
    } else {
      this.openingTag = highlight(`<${str} />`);
    }
  }

  createToolTip() {
    this.toolTip = Element.DOM({ classNames: 'char__tooltip' });
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
    this.characterCode.classList.add('char__html--hover');

    this.toolTip.style = `position: fixed; top: ${top - 20}px; left: ${
      right + 10
    }px;`;
    document.body.append(this.toolTip);
  }

  removeHover() {
    this.characterIcon.classList.remove('char--hover');
    this.characterCode.classList.remove('char__html--hover');
    this.toolTip.remove();
    this.toolTip.style = '';
  }

  static addParam(source, param, str) {
    let result = str;

    if (source[param]) {
      result += ` ${param === 'className' ? 'class' : param}="${
        source[param]
      }"`;
    }

    return result;
  }
}

export default Character;
