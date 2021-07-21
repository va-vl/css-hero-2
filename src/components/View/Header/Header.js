import { MyComponent } from '@lib';

export class Header extends MyComponent {
  constructor() {
    super({ classNames: 'header', textContent: 'header placeholder' });
  }
}
