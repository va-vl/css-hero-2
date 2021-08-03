import { MyComponent } from '@lib';

const CSS_DESCRIPTION = `{
  /* Some CSS rules */
}

/*
  Type in a number to select a level:
  "5" switches to level 5
*/`;

/**
 * @returns {DocumentFragment} fragment with CSS description HTML elements
 */
export const getCssDescriptionFragment = () => {
  const fragment = new DocumentFragment();

  CSS_DESCRIPTION.split('\n').forEach((line) => {
    fragment.append(line);
    fragment.append(new MyComponent({ tagName: 'br' }).HTMLElement);
  });

  return fragment;
};
