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
    super({ tagName: 'main', classNames: 'view' });

    this.header = new Header('view__header');
    this.levelDisplay = new LevelDisplay('view__level-display');
    this.code = new Code('view__code');
    this.footer = new Footer('view__footer');
    this.menu = new Menu('view__menu', model);

    const grid = MyComponent.createHTMLElement({ classNames: 'view__grid' });
    const wrapper = MyComponent.createHTMLElement({
      classNames: 'view__wrapper',
    });

    wrapper.append(
      this.header.HTMLElement,
      this.levelDisplay.HTMLElement,
      this.code.HTMLElement,
      this.footer.HTMLElement
    );
    grid.append(wrapper, this.menu.HTMLElement);

    this.addChildren(grid);
  }
}
