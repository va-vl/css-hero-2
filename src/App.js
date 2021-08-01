import { MyComponent } from '@lib';
import { Header, Level, Footer, Menu } from './components';
import './App.scss';

export class App extends MyComponent {
  /**
   *  @param {Model} model interface for store
   */
  constructor(model) {
    super({ tagName: 'main', classNames: ['app', 'app__grid'] });

    const { levels } = model.getLevelData();

    const header = new Header();
    const footer = new Footer({ classNames: ['app__footer'] });

    this.level = new Level({ classNames: ['app__level'] });
    this.menu = new Menu({
      classNames: ['app__menu'],
      levels,
    });

    this.render(model);

    model.subscribe(() => {
      this.render(model);
    });

    this.appendChildren(
      new MyComponent({
        classNames: ['app__wrapper'],
        children: [header, this.level, footer],
      }),
      this.menu
    );
  }

  /**
   * @param {Model} model
   */
  render(model) {
    const { currentLevelIndex, currentLevel, levels } = model.getLevelData();

    const setLevelCb = (levelIndex) => {
      model.setLevel(levelIndex);
    };

    this.level.render({
      currentLevelIndex,
      currentLevel,
    });

    this.menu.render({
      currentLevelIndex,
      currentLevel,
      levels,
      setLevelCb,
    });
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
