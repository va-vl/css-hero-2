import { MyComponent } from '@lib';
import { Header, Level, Footer, Menu } from './components';
import './App.scss';

export class App extends MyComponent {
  /**
   *  @param {Model} model interface for store
   */
  constructor(model) {
    super({ tagName: 'main', classNames: ['app', 'app__grid'] });

    const { currentLevelIndex, currentLevel, levels } = model.getLevelData();

    const header = new Header();

    this.level = new Level({
      classNames: ['app__footer'],
      currentLevelIndex,
      currentLevel,
    });

    const footer = new Footer({ classNames: ['app__footer'] });

    const wrapper = new MyComponent({
      classNames: ['app__wrapper'],
      children: [header, this.level, footer],
    });

    this.menu = new Menu({
      classNames: ['app__menu'],
      currentLevelIndex,
      currentLevel,
      levels,
      changeLevelCb: (levelIndex) => {
        model.setLevel(levelIndex);
      },
    });

    model.subscribe(() => {
      this.render(model);
    });

    this.appendChildren(wrapper, this.menu);
  }

  /**
   * @param {Model} model
   */
  render(model) {
    const { currentLevelIndex, currentLevel, levels } = model.getLevelData();

    this.level.render(currentLevelIndex, currentLevel);
    this.menu.render(currentLevelIndex, currentLevel, levels);
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
