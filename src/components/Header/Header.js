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

    const logo = MyComponent.createHTMLElement(
      {
        tagName: 'h1',
        classNames: ['header__logo'],
      },
      [
        MyComponent.createHTMLElement({
          tagName: 'span',
          classNames: ['header__logo-fancy'],
          textContent: 'CSS',
        }),
        MyComponent.createHTMLElement({
          tagName: 'span',
          classNames: ['header__logo-plain'],
          textContent: 'hero',
        }),
      ]
    );

    this.menuButton = new KeyButton({
      classNames: ['header__button', 'header__button--menu'],
      textContent: 'Show menu',
    });
    this.helpButton = new KeyButton({
      classNames: ['header__button', 'header__button--help'],
      textContent: "Help me, I'm stuck!",
    });

    this.addChildren(logo, this.menuButton, this.helpButton);
  }
}
