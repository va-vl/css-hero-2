import { MyComponent } from '@lib';
import { KeyButton } from '@components/common';
import './Header.scss';

export class Header extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   */
  constructor(outerClassNames) {
    super({
      tagName: 'header',
      classNames: [...outerClassNames, 'header'],
    });

    const logo = new MyComponent({
      tagName: 'h1',
      classNames: ['header__logo'],
    });
    const logoFancy = new MyComponent({
      tagName: 'span',
      classNames: ['header__logo-fancy'],
      textContent: 'CSS',
    });
    const logoPlain = new MyComponent({
      tagName: 'span',
      classNames: ['header__logo-plain'],
      textContent: 'hero',
    });

    logo.appendChildren(logoFancy, logoPlain);

    const menuButton = new KeyButton({
      classNames: ['header__button', 'header__button--menu'],
      textContent: 'Show menu',
    });
    const helpButton = new KeyButton({
      classNames: ['header__button', 'header__button--help'],
      textContent: "Help me, I'm stuck!",
    });

    this.appendChildren(logo, menuButton, helpButton);
  }
}
