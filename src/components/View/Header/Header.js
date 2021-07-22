import { MyComponent } from '@lib';
import { KeyButton } from '@components/common';
import './Header.scss';

export class Header extends MyComponent {
  /**
   * @param {String} outerClassNames classNames from outer component
   */
  constructor(outerClassNames) {
    super({
      tagName: 'header',
      classNames: `${outerClassNames} header`,
    });

    const fancy = MyComponent.createHTMLElement({
      tagName: 'span',
      classNames: 'header__logo-fancy',
      textContent: 'CSS',
    });
    const plain = MyComponent.createHTMLElement({
      tagName: 'span',
      classNames: 'header__logo-plain',
      textContent: 'hero',
    });
    const logo = MyComponent.createHTMLElement({
      tagName: 'h1',
      classNames: 'header__logo',
    });

    logo.append(fancy, plain);

    this.menuButton = new KeyButton({
      classNames: 'header__button header__button--menu',
      textContent: 'Show menu',
    });
    this.helpButton = new KeyButton({
      classNames: 'header__button header__button--key',
      textContent: "Help me, I'm stuck!",
    });

    this.addChildren(logo, this.menuButton, this.helpButton);
  }
}
