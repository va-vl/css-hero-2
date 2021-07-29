import { MyComponent } from '@lib';
// import { Character } from './Character/Character';
import { Display } from './Display/Display';
import { Code } from './Code/Code';
import './Level.scss';

export class Level extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   * @param {Model} model interface for state access
   */
  constructor(outerClassNames /* , model */) {
    super({
      classNames: [...outerClassNames, 'level'],
    });

    const display = new Display(['level__display']);
    const code = new Code(['level__code']);

    this.appendChildren(display, code);
  }
}
