import { MyComponent } from '@lib';
import { Menu } from './Menu/Menu';
import { Header } from './Header/Header';
import { LevelDisplay } from './LevelDisplay/LevelDisplay';
import { Code } from './Code/Code';
import { Footer } from './Footer/Footer';

export class View extends MyComponent {
  /**
   * @param {HTMLElement} root root element
   * @param {Model} model data model
   */
  constructor(model) {
    super({ tagName: 'div', classNames: 'view' });

    this.model = model;
    this.menu = new Menu();
    this.header = new Header();
    this.levelDisplay = new LevelDisplay();
    this.code = new Code();
    this.footer = new Footer();

    const mainWrapper = new MyComponent({
      tagName: 'main',
      classNames: 'view__main main',
    });
    mainWrapper.addChildren(
      this.header,
      this.levelDisplay,
      this.code,
      this.footer
    );

    this.addChildren(mainWrapper, this.menu);
  }
}
