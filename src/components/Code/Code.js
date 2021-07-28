import { MyComponent } from '@lib';
import './Code.scss';

export class Code extends MyComponent {
  /**
   * @param {String} outerClassNames classNames from outer component
   * @param {object} store application state store
   */
  constructor(outerClassNames, store) {
    super({
      classNames: [...outerClassNames, 'code'],
      textContent: 'code placeholder',
    });

    console.log('code: ', store);
  }
}
