import { MyComponent } from '@lib';

export class LevelDisplay extends MyComponent {
  constructor() {
    super({
      classNames: 'level-display',
      textContent: 'level display placeholder',
    });
  }
}
