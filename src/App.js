import { MyComponent } from '@lib';
import {
  MENU_ACTIVE_CLASS_NAME,
  CODE_WRONG_CLASS_NAME,
  LEVEL_STATUSES,
  ANIMATION_WRONG_TIMEOUT,
  ANIMATION_SOLVED_TIMEOUT,
  ANIMATION_AUTOCOMPLETE_TIMEOUT,
} from '@constants';
import { Header, Level, Footer, Menu, VictoryScreen } from './components';
import { isValidIntegerString, isIntegerString } from './utils';
import './App.scss';

export class App extends MyComponent {
  /**
   *  @param {Model} model interface for store
   */
  constructor(model) {
    super({ tagName: 'main', classNames: ['app', 'app__grid'] });

    const setLevelCb = (index) => {
      if (model.isAnimationOn()) {
        return;
      }

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

    const showWrongAnimation = () => {
      model.setAnimation(ANIMATION_WRONG_TIMEOUT);
      this.level.code.addClasses([CODE_WRONG_CLASS_NAME]);

      setTimeout(() => {
        this.level.code.removeClasses([CODE_WRONG_CLASS_NAME]);
      }, ANIMATION_SOLVED_TIMEOUT);
    };

    const showCorrectAnimation = (targets) => {
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
        showWrongAnimation();
        return;
      }

      if (isIntegerString(selector)) {
        if (isValidIntegerString(selector, 0, levels.length)) {
          setLevelCb(+selector - 1);
        } else {
          showWrongAnimation();
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

          showCorrectAnimation(targets);
        } else {
          showWrongAnimation();
        }
      } catch (error) {
        showWrongAnimation();
      }
    };

    const setAutoCompleteCb = () => {
      if (model.isAnimationOn()) {
        return;
      }

      model.startAnimation();

      const { codeMirror } = this.level.code.input;
      const { currentLevel, currentLevelIndex } = model.getData();
      const { answer } = currentLevel;

      const animateAutoComplete = (i) => {
        if (i < answer.length) {
          codeMirror.setValue(answer.slice(0, i + 1));
          codeMirror.refresh();
          setTimeout(() => {
            animateAutoComplete(i + 1);
          }, ANIMATION_AUTOCOMPLETE_TIMEOUT);
          return;
        }

        codeMirror.execCommand('goLineEnd');
        codeMirror.focus();

        const targets = [
          ...this.level.display.chars.HTMLElement.querySelectorAll('.target'),
        ];

        showCorrectAnimation(targets);

        model.setLevelSolved(
          currentLevelIndex,
          LEVEL_STATUSES.ASSISTED,
          ANIMATION_SOLVED_TIMEOUT
        );
      };

      animateAutoComplete(0);
    };

    const resetProgressCb = () => {
      if (model.isAnimationOn()) {
        return;
      }

      const { currentLevelIndex } = model.getData();

      model.resetProgress(currentLevelIndex);
    };

    const setMenuActiveCb = () => {
      this.menu.addClasses([MENU_ACTIVE_CLASS_NAME]);
    };

    const header = new Header({
      onMenuButtonClickCb: setMenuActiveCb,
      onHelpButtonClickCb: setAutoCompleteCb,
    });

    this.level = new Level({
      classNames: ['app__level'],
      checkAnswerCb,
    });

    const footer = new Footer({ classNames: ['app__footer'] });

    this.menu = new Menu({
      classNames: ['app__menu'],
      levels: model.getData().levels,
      menuActiveClassName: MENU_ACTIVE_CLASS_NAME,
      setLevelCb,
      setPrevLevelCb,
      setNextLevelCb,
      resetProgressCb,
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

    const { currentLevelIndex, currentLevel, levels } = model.getData();

    this.level.render({ currentLevel });

    this.menu.render({
      currentLevelIndex,
      currentLevel,
      levels,
    });

    model.saveSnapshot();
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
