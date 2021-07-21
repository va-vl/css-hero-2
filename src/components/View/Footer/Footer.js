import { MyComponent } from '@lib';
import './Footer.scss';

export class Footer extends MyComponent {
  /**
   * @param {String} outerClassNames classNames from outer component
   */
  constructor(outerClassNames) {
    super({
      classNames: `${outerClassNames} footer`,
      textContent: 'footer placeholder',
    });
  }
}
