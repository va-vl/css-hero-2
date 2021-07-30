import { MyComponent } from '@lib';
import { Header, Level, Footer, Menu } from './components';
import './App.scss';

export class App extends MyComponent {
  /**
   *  @param {Model} model interface for store
   */
  constructor(/* model */) {
    super({ tagName: 'main', classNames: ['app', 'app__grid'] });

    // const { currentLevelIndex, currentLevel, levels } = model.getLevelData();

    const header = new Header({ classNames: ['app__header'] });
    const footer = new Footer({ classNames: ['app__footer'] });
    const menu = new Menu({ classNames: ['app__menu'] });
    const level = new Level({ classNames: ['app__footer'] });
    const wrapper = new MyComponent({
      classNames: ['app__wrapper'],
      children: [header, level, footer],
    });

    this.appendChildren(wrapper, menu);
  }

  /**
   * @param {HTMLElement} root where the app gets appended
   * @param {Model} model interface for store
   */
  static init(root, model) {
    const app = new App(model).HTMLElement;
    root.appendChild(app);
  }
}
