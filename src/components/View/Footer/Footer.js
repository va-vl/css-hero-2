import { MyComponent } from '@lib';
import { githubLogo } from '@images';
import './Footer.scss';

export class Footer extends MyComponent {
  /**
   * @param {String} outerClassNames classNames from outer component
   */
  constructor(outerClassNames) {
    super({
      tagName: 'footer',
      classNames: `${outerClassNames} footer`,
    });

    const githubImage = MyComponent.createHTMLElement({
      tagName: 'img',
      classNames: 'footer__github-image',
      attrs: {
        src: githubLogo,
        alt: 'GitHub logo',
        width: 100,
      },
    });
    const githubLink = MyComponent.createHTMLElement({
      tagName: 'a',
      classNames: 'footer__github-link',
      attrs: {
        href: 'https://github.com/va-z/css-hero-2',
        target: '_blank',
      },
    });

    githubLink.appendChild(githubImage);

    const footerText = MyComponent.createHTMLElement({
      tagName: 'p',
      textContent: 'Made by va-z in 2021',
    });

    this.addChildren(githubLink, footerText);
  }
}
