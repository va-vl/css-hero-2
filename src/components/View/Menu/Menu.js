import { MyComponent } from '@lib';
import './Menu.scss';

export class Menu extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   */
  constructor(outerClassNames = []) {
    super({
      classNames: [...outerClassNames, 'menu'],
      textContent: 'menu placeholder',
    });
  }
}
