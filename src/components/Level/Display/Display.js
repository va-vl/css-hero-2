import { MyComponent } from '@lib';
import './Display.scss';

export class Display extends MyComponent {
  /**
   * @param {Object} props
   * @param {String[]} props.classNames classNames from outer component
   */
  constructor({ classNames }) {
    super({
      classNames: [...classNames, 'display'],
    });

    this.title = new MyComponent({
      tagName: 'h2',
      classNames: ['display__title'],
    });

    this.chars = new MyComponent({
      classNames: ['display__chars'],
    });

    const wrapper = new MyComponent({
      classNames: ['display__wrapper'],
      children: [
        this.chars,
        new MyComponent({ classNames: ['display__grass'] }),
        new MyComponent({ classNames: ['display__ground'] }),
      ],
    });

    this.appendChildren(this.title, wrapper);
  }

  /**
   * @param {Object} props
   * @param {String} props.title level title
   * @param {DocumentFragment} props.iconLevelFragment
   */
  render({ title, iconLevelFragment }) {
    const junk = document.body.querySelectorAll('.char__tooltip');
    [...junk].forEach((item) => item.remove());

    this.title.setTextContent(title);
    this.chars.clearContent();
    this.chars.appendChildren(iconLevelFragment);
  }
}
