import { MyComponent } from '@lib';
import { Header, LevelDisplay, Code, Footer, Menu } from './components';
import './App.scss';

export class App extends MyComponent {
  /**
   * @param {Object} store apps state store
   */
  constructor(store) {
    super({ tagName: 'main', classNames: ['app', 'app__grid'] });

    const menu = new Menu(['app__menu'], store);
    const header = new Header(['app__header']);
    const levelDisplay = new LevelDisplay(['app__level-display'], store);
    const code = new Code(['app__code'], store);
    const footer = new Footer(['app__footer']);

    const wrapper = new MyComponent({ classNames: ['app__wrapper'] });
    wrapper.appendChildren(header, levelDisplay, code, footer);

    this.appendChildren(wrapper, menu);
  }

  /**
   * @param {HTMLElement} root where the app gets appended
   * @param {object} store app state store
   */
  static init(root, store) {
    const app = new App(store).HTMLElement;
    root.appendChild(app);
  }
}
