import { MyComponent } from '@lib';
import './Display.scss';

export class Display extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   * @param {Model} model interface for state access
   */
  constructor(outerClassNames) {
    super({
      classNames: [...outerClassNames, 'display'],
    });

    this.title = new MyComponent({
      tagName: 'h2',
      classNames: ['level-display__title'],
    });
    this.chars = new MyComponent({ classNames: ['level-display__chars'] });

    const grass = new MyComponent({ classNames: ['level-display__grass'] });
    const ground = new MyComponent({ classNames: ['level-display__ground'] });
    const wrapper = new MyComponent({ classNames: ['level-display__wrapper'] });

    wrapper.appendChildren(this.chars, grass, ground);
    this.appendChildren(this.title, wrapper);
  }
}
