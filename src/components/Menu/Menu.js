import { MyComponent } from '@lib';
import './Menu.scss';

export class Menu extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   * @param {object} store application state store
   */
  constructor(outerClassNames, store) {
    super({
      classNames: [...outerClassNames, 'menu'],
      textContent: 'menu placeholder',
    });
    console.log('menu: ', store);
  }
}
