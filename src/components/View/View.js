import { MyComponent } from '@lib';
import { Menu } from './Menu/Menu';
import { Header } from './Header/Header';
import { LevelDisplay } from './LevelDisplay/LevelDisplay';
import { Code } from './Code/Code';
import { Footer } from './Footer/Footer';
import './View.scss';

export class View extends MyComponent {
  /**
   * @param {HTMLElement} root root element
   * @param {Model} model data model
   */
  constructor(model) {
    super({ tagName: 'main', classNames: ['view', 'view__grid'] });

    this.header = new Header(['view__header']);
    this.levelDisplay = new LevelDisplay(['view__level-display']);
    this.code = new Code(['view__code']);
    this.footer = new Footer(['view__footer']);
    this.menu = new Menu(['view__menu'], model);

    const wrapper = MyComponent.createHTMLElement(
      {
        classNames: ['view__wrapper'],
      },
      [this.header, this.levelDisplay, this.code, this.footer]
    );

    this.addChildren(wrapper, this.menu);
  }
}
