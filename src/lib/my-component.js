/**
 * An object containing HTML attributes
 * use null for attributes not requiring a value
 * @typedef {Object.<string, (number | boolean | string | null)>} AttrsObject
 */

/**
 * Child elements that can be appended to MyComponent's HTMLElement prop
 * @typedef {(HTMLElement | MyComponent)[]} ChildrenArray
 */

/**
 * MyComponent constructor argument
 * @typedef {Object} MyComponentProps
 * @property {String} tagName component HTML tag
 * @property {String[] | void} classNames array of CSS class names
 * @property {String | void} textContent html element's text content
 * @property {AttrsObject} attrs html element's attributes
 * @property {ChildrenArray} children html element's child elements
 */

const ALLOWED_ATTR_VALUE_TYPES = ['string', 'number', 'boolean'];

const checkClassNameType = (className) => {
  if (typeof className !== 'string') {
    throw new TypeError('MyComponent className must be string!');
  }
};

export class MyComponent {
  /**
   * @param {MyComponentProps} props
   */
  constructor({
    tagName = 'div',
    classNames = null,
    textContent = null,
    attrs = null,
    children = null,
  } = {}) {
    this.HTMLElement = document.createElement(tagName);

    if (classNames) {
      this.addClasses(classNames);
    }

    if (textContent) {
      this.setTextContent(textContent);
    }

    if (attrs) {
      this.setAttrs(attrs);
    }

    if (children) {
      this.appendChildren(...children);
    }
  }

  /**
   * Adds classNames to HTMLElement
   * @param {String[]} classNames space-delimited string of CSS class names
   * @returns {void}
   */
  addClasses(classNames) {
    classNames.forEach((className) => {
      checkClassNameType(className);
      this.HTMLElement.classList.add(className);
    });
  }

  /**
   * Removes classNames from HTMLElement
   * If classes from classNames don't exist on HTMLElement, does nothing
   * @param {String[]} classNames space-delimited string of CSS class names
   * @returns {void}
   */
  removeClasses(classNames) {
    classNames.forEach((className) => {
      checkClassNameType(className);
      this.HTMLElement.classList.remove(className);
    });
  }

  /**
   * Toggles classNames on HTMLElement
   * @param {String[]} classNames space-delimited string of CSS class names
   * @returns {void}
   */
  toggleClasses(classNames) {
    classNames.forEach((className) => {
      checkClassNameType(className);
      this.HTMLElement.classList.toggle(className);
    });
  }

  /**
   * Sets attributes to HTMLElement
   * @param {AttrsObject} attrs a list of key=value pairs
   * @returns {void}
   */
  setAttrs(attrs) {
    Object.entries(attrs).forEach(([attr, value]) => {
      if (value === null) {
        this.HTMLElement.setAttribute(attr);
        return;
      }

      if (ALLOWED_ATTR_VALUE_TYPES.includes(typeof value)) {
        this.HTMLElement.setAttribute(attr, String(value));
        return;
      }

      throw new TypeError(
        'MyComponent attr values must be string, number, boolean or null!'
      );
    });
  }

  /**
   * Removes attributes from HTMLElement
   * If attribute from attrs doesn't exist on HTMLElement, does nothing
   * @param {String[]} attrsList a list of attributes
   * @return {void}
   */
  removeAttrs(attrsList) {
    attrsList.forEach((attrName) => {
      if (typeof attrName === 'string') {
        this.HTMLElement.removeAttribute(attrName);
        return;
      }

      throw new TypeError('MyComponent attrList must be an array of strings!');
    });
  }

  /**
   * Sets textContent of HTMLElement
   * @param {String} textContent
   */
  setTextContent(textContent) {
    this.HTMLElement.textContent = textContent;
  }

  /**
   * Adds text to existing textContent of HTMLElement
   * @param  {String} textContent
   */
  addTextContent(textContent) {
    this.HTMLElement.textContent += textContent;
  }

  /**
   * Append HTML elements as children of this HTMLElement
   * @param  {...ChildrenArray} children
   */
  appendChildren(...children) {
    children.forEach((child) => {
      if (child instanceof Node) {
        this.HTMLElement.appendChild(child);
        return;
      }

      if (child instanceof MyComponent) {
        this.HTMLElement.appendChild(child.HTMLElement);
        return;
      }

      throw new TypeError('MyComponent appendChildren can append only Node!');
    });
  }

  clearContent() {
    this.HTMLElement.innerHTML = '';
  }

  /**
   * Uses insertAdjacentHTML on this.HTMLElement
   * @param {position} string
   * @param {String} HTMLString
   */
  setInnerHTML(position, HTMLString) {
    this.clearContent();
    this.HTMLElement.insertAdjacentHTML(position, HTMLString);
  }
}
