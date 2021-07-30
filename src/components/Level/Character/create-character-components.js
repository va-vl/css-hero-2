import { MyComponent } from '@lib';
import { highlight } from '../../../utils';

/**
 * @typedef {Object} CharProps
 * @property {String} tagName character HTML tag name
 * @property {String[]} classNames character CSS classes
 * @property {Object<string, (string | number | boolean | void)>} attrs character HTML attributes
 * @property {CharProps[]} children
 */

/**
 * @param {CharProps} charProps
 * @returns {HTMLElement}
 */
const createIcon = ({ tagName, classNames, attrs }) =>
  new MyComponent({ tagName, classNames, attrs }).HTMLElement;

/**
 * @param {String} className
 * @returns  {HTMLElement}
 */
const createCodeContainer = (className) =>
  new MyComponent({ classNames: [className] }).HTMLElement;

/**
 * @param {CharProps} charProps
 * @returns {String[]}
 */
const createCodeStrings = ({ tagName, classNames, attrs, children }) => {
  let str = `${tagName}`;

  if (classNames) {
    const classNamesString = classNames
      .reduce(
        (result, className) =>
          result + (className === 'target' ? '' : `${className} `),
        ''
      )
      .trim();

    str += classNamesString && ` class="${classNamesString}"`;
  }

  if (attrs) {
    str += Object.entries(attrs).reduce(
      (result, [key, value]) => ` ${result}${key}="${value}"`,
      ''
    );
  }

  return children
    ? [highlight(`<${str}>`), highlight(`</${tagName}>`)]
    : [highlight(`<${str} />`)];
};

/**
 * @param {String} openingTagString
 * @param {String} closingTagString
 * @returns {HTMLElement} tooltip
 */
const createToolTip = (openingTagString, closingTagString) => {
  const toolTip = new MyComponent({
    classNames: ['char__tooltip'],
  }).HTMLElement;

  toolTip.insertAdjacentHTML('afterBegin', openingTagString);

  if (closingTagString) {
    toolTip.insertAdjacentHTML('beforeEnd', closingTagString);
  }

  return toolTip;
};

/**
 *
 * @param {CharProps} props
 * @param {String} codeClassName
 * @returns {[HTMLElement, HTMLElement, HTMLElement, string, (string|undefined)]} [icon, codeContainer, toolTip, openingTagString, closingTagString]
 */
export const createCharacterComponents = (props, codeClassName) => {
  const icon = createIcon(props);
  const codeContainer = createCodeContainer(codeClassName);
  const [openingString, closingString] = createCodeStrings(props);
  const tooltip = createToolTip(openingString, closingString);

  return [icon, codeContainer, tooltip, openingString, closingString];
};
