import { MyComponent } from '@lib';
import { ProgressBar } from './ProgressBar/ProgressBar';
import './LevelDescription.scss';

export class LevelDescription extends MyComponent {
  constructor() {
    super({
      textContent: 'menu level description placeholder',
    });

    const progressBar = new ProgressBar();

    this.appendChildren(progressBar);
  }
}
