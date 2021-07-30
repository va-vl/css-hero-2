import { MyComponent } from '@lib';
import './Display.scss';

export class Display extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames classNames from outer component
   */
  constructor({ classNames }) {
    super({
      classNames: [...classNames, 'display'],
    });

    this.title = new MyComponent({
      tagName: 'h2',
      classNames: ['display__title'],
    });

    this.chars = new MyComponent({ classNames: ['display__chars'] });

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

  renderLevel(levelData, iconFragment) {
    this.title.setTextContent(levelData.title);
    this.chars.clearContent();
    this.chars.HTMLElement.append(iconFragment);
  }
}
