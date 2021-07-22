/**
 * An object containing HTML attributes
 * use null for attributes not requiring a value
 * @typedef {Object.<string, (number | boolean | string | null)>} attrsObject
 */

/**
 * MyComponent constructor argument
 * @typedef {Object} MyComponentProps
 * @property {String} tagName component HTML tag
 * @property {String | null} classNames space-delimited string of CSS class names
 * @property {String | null} textContent html element's text content
 * @property {attrsObject} attrs html element's attributes
 */

const ALLOWED_ATTR_VALUE_TYPES = ['string', 'number', 'boolean'];

export class MyComponent {
  /**
   * @param {MyComponentProps} props
   */
  constructor({
    tagName = 'div',
    classNames = null,
    textContent = null,
    attrs = null,
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
  }

  /**
   * Adds classNames to HTMLELement
   * @param {String} classNames space-delimited string of CSS class names
   * @returns {void}
   */
  addClasses(classNames) {
    if (typeof classNames === 'string') {
      this.HTMLElement.classList.add(...classNames.split(' '));
      return;
    }

    throw new TypeError('MyComponent className must be string!');
  }

  /**
   * Removes classNames from HTMLElement
   * If classes from classNames don't exist on HTMLElement, does nothing
   * @param {String} classNames space-delimited string of CSS class names
   * @returns {void}
   */
  removeClasses(classNames) {
    if (typeof classNames === 'string') {
      this.HTMLElement.classList.remove(...classNames.split(' '));
      return;
    }

    throw new TypeError('MyComponent className must be string!');
  }

  /**
   * Sets attributes to HTMLElement
   * @param {attrsObject} attrs a list of key=value pairs
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
   *
   * @param  {...(HTMLElement | MyComponent)[]} children
   */
  addChildren(...children) {
    children.forEach((child) => {
      if (child instanceof Node) {
        this.HTMLElement.appendChild(child);
        return;
      }

      if (child instanceof MyComponent) {
        this.HTMLElement.appendChild(child.HTMLElement);
        return;
      }

      throw new TypeError('MyComponent addChildren can append only Node!');
    });
  }

  /**
   * Creates a new instance of MyComponent but returns only its HTMLElement
   * @param {MyComponentProps} props
   * @returns {HTMLElement} HTMLElement created from props
   */
  static createHTMLElement(props) {
    return new this(props).HTMLElement;
  }
}