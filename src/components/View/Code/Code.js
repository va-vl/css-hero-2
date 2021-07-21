import { MyComponent } from '@lib';
import './Code.scss';

export class Code extends MyComponent {
  /**
   * @param {String} outerClassNames classNames from outer component
   */
  constructor(outerClassNames) {
    super({
      classNames: `${outerClassNames} code`,
      textContent: 'code placeholder',
    });
  }
}
