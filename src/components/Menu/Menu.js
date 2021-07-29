import { MyComponent } from '@lib';
import './Menu.scss';

export class Menu extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   * @param {Model} model interface for state access
   */
  constructor(outerClassNames /* , model */) {
    super({
      classNames: [...outerClassNames, 'menu'],
    });
  }
}
