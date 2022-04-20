import { MyComponent } from '@lib';
import { githubLogo } from '@images';
import './Footer.scss';

export class Footer extends MyComponent {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames CSS class names
   */
  constructor({ classNames = [] } = {}) {
    super({
      tagName: 'footer',
      classNames: [...classNames, 'footer'],
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

    const githubLink = new MyComponent({
      tagName: 'a',
      classNames: ['footer__github-link'],
      attrs: {
        href: 'https://github.com/va-vl/css-hero-2',
        target: '_blank',
      },
      children: [githubImage],
    });

    const footerText = new MyComponent({
      tagName: 'p',
      textContent: 'Made by va-vl in 2021',
    });

    this.appendChildren(githubLink, footerText);
  }
}
