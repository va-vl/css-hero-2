import { MyComponent } from '@lib';

export class Footer extends MyComponent {
  constructor() {
    super({ classNames: 'footer', textContent: 'footer placeholder' });
  }
}
