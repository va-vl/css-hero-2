import { MyComponent } from '@lib';
import { ProgressBar } from './ProgressBar/ProgressBar';
import './LevelDescription.scss';

export class LevelDescription extends MyComponent {
  constructor(outerClassNames) {
    super({
      classNames: [...outerClassNames, 'level-description'],
    });

    const progressBar = new ProgressBar(['level-description__progress-bar']);

    this.appendChildren(progressBar);
  }
}
