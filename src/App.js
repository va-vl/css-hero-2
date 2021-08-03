import { MyComponent } from '@lib';
import {
  MENU_ACTIVE_CLASS_NAME,
  CODE_WRONG_CLASS_NAME,
  LEVEL_STATUSES,
  ANIMATION_WRONG_TIMEOUT,
  ANIMATION_SOLVED_TIMEOUT,
} from '@constants';
import { Header, Level, Footer, Menu, VictoryScreen } from './components';
import './App.scss';

const isNumber = (selector) => /^\d+/.test(selector);
const isValidNumber = (num, levels) => num > 0 && num <= levels.length;

export class App extends MyComponent {
  /**
   *  @param {Model} model interface for store
   */
  constructor(model) {
    super({ tagName: 'main', classNames: ['app', 'app__grid'] });

    const setLevelCb = (index) => {
      model.setLevel(index);
    };

    const setPrevLevelCb = () => {
      const { currentLevelIndex } = model.getData();
      setLevelCb(currentLevelIndex - 1);
    };

    const setNextLevelCb = () => {
      const { currentLevelIndex } = model.getData();
      setLevelCb(currentLevelIndex + 1);
    };

    const showWrong = () => {
      model.setAnimation(ANIMATION_WRONG_TIMEOUT);
      this.level.code.addClasses([CODE_WRONG_CLASS_NAME]);

      setTimeout(() => {
        this.level.code.removeClasses([CODE_WRONG_CLASS_NAME]);
      }, ANIMATION_SOLVED_TIMEOUT);
    };

    const showCorrect = (targets) => {
      targets.forEach((target) => {
        target.classList.add('correct');
      });
    };

    const checkAnswerCb = (selector) => {
      if (model.isAnimationOn()) {
        return;
      }

      const { currentLevelIndex, levels } = model.getData();

      if (selector.includes('.target')) {
        showWrong();
        return;
      }

      if (isNumber(selector)) {
        if (isValidNumber(+selector, levels)) {
          setLevelCb(+selector - 1);
        } else {
          showWrong();
        }

        return;
      }

      try {
        const charsHTMLElement = this.level.display.chars.HTMLElement;
        const query = [...charsHTMLElement.querySelectorAll(selector)];
        const targets = [...charsHTMLElement.querySelectorAll('.target')];

        const isSelectorCorrect =
          query.length === targets.length &&
          targets.every((target) => query.includes(target));

        if (isSelectorCorrect) {
          model.setLevelSolved(
            currentLevelIndex,
            LEVEL_STATUSES.SOLVED,
            ANIMATION_SOLVED_TIMEOUT
          );

          showCorrect(targets);
        } else {
          showWrong();
        }
      } catch (error) {
        console.log(error);
        showWrong();
      }
    };

    const onMenuButtonClickCb = () => {
      this.menu.addClasses([MENU_ACTIVE_CLASS_NAME]);
    };

    const header = new Header({ onMenuButtonClickCb });
    const footer = new Footer({ classNames: ['app__footer'] });

    this.level = new Level({
      classNames: ['app__level'],
      checkAnswerCb,
    });

    this.menu = new Menu({
      classNames: ['app__menu'],
      levels: model.getData().levels,
      menuActiveClassName: MENU_ACTIVE_CLASS_NAME,
      setLevelCb,
      setPrevLevelCb,
      setNextLevelCb,
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
    if (model.isAnimationOn()) {
      return;
    }

    if (model.isGameCompleted()) {
      VictoryScreen.show(document.body);
    }

    model.saveSnapshot();

    const { currentLevelIndex, currentLevel, levels } = model.getData();

    this.level.render({ currentLevel });

    this.menu.render({
      currentLevelIndex,
      currentLevel,
      levels,
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
