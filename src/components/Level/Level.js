import { MyComponent } from '@lib';
import { Character } from './Character/Character';
import { Display } from './Display/Display';
import { Code } from './Code/Code';
import './Level.scss';

export class Level extends MyComponent {
  /**
   * @param {String[]} outerClassNames classNames from outer component
   * @param {Model} model interface for state access
   */
  constructor(outerClassNames, model) {
    super({
      classNames: [...outerClassNames, 'level'],
    });

    const { currentLevel } = model.getCurrentLevelData();
    const { iconLevelFragment, codeLevelFragment } =
      Level.createLevelRender(currentLevel);

    this.display = new Display(['level__display']);
    this.code = new Code(['level__code']);
    this.renderLevel(currentLevel, iconLevelFragment, codeLevelFragment);
    this.appendChildren(this.display, this.code);
  }

  renderLevel(levelData, iconFragment, codeLevelFragment) {
    this.display.renderLevel(levelData, iconFragment);
    this.code.renderLevel(codeLevelFragment);
  }

  static createLevelRender(level) {
    const iconLevelFragment = new DocumentFragment();
    const codeLevelFragment = new DocumentFragment();

    Level.processLevelCharacters(
      level.layout,
      iconLevelFragment,
      codeLevelFragment
    );

    return {
      iconLevelFragment,
      codeLevelFragment,
    };
  }

  /*
    processLevelCharacters is based on the deep cloning algorithm from
    https://stackoverflow.com/a/28876564
  */
  static processLevelCharacters(layout, iconParent, codeParent) {
    let result;

    if (Array.isArray(layout)) {
      result = layout.map((character) =>
        Level.processLevelCharacters(character, iconParent, codeParent)
      );
    } else if (typeof layout === 'object' && layout !== null) {
      result = new Character(layout);

      const {
        characterIcon,
        characterCode,
        openingTagString,
        closingTagString,
      } = result;

      iconParent.append(characterIcon);

      characterCode.insertAdjacentHTML('afterBegin', openingTagString);

      if (layout.children && layout.children.length) {
        result.children = Level.processLevelCharacters(
          layout.children,
          characterIcon,
          characterCode
        );
      }

      if (closingTagString) {
        characterCode.insertAdjacentHTML('beforeEnd', closingTagString);
      }

      codeParent.appendChild(characterCode);
    } else {
      result = layout;
    }

    return result;
  }
}
