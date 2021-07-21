import { MyComponent } from '@lib';
import './Header.scss';

export class Header extends MyComponent {
  /**
   * @param {String} outerClassNames classNames from outer component
   */
  constructor(outerClassNames) {
    super({
      classNames: `${outerClassNames} header`,
      textContent: 'header placeholder',
    });
  }
}
