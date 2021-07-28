import { MyComponent } from '@lib';
import { githubLogo } from '@images';
import './Footer.scss';

export class Footer extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   */
  constructor(outerClassNames) {
    super({
      tagName: 'footer',
      classNames: [...outerClassNames, 'footer'],
    });

    const githubLink = new MyComponent({
      tagName: 'a',
      classNames: ['footer__github-link'],
      attrs: {
        href: 'https://github.com/va-z/css-hero-2',
        target: '_blank',
      },
    });
    const githubImage = new MyComponent({
      tagName: 'img',
      classNames: ['footer__github-image'],
      attrs: {
        src: githubLogo,
        alt: 'GitHub logo',
        width: 100,
      },
    });
    githubLink.appendChildren(githubImage);

    const footerText = new MyComponent({
      tagName: 'p',
      textContent: 'Made by va-z in 2021',
    });

    this.appendChildren(githubLink, footerText);
  }
}
