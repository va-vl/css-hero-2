import { MyComponent } from '@lib';
import { Character } from './Character/Character';
import { Display } from './Display/Display';
import { Code } from './Code/Code';
import './Level.scss';

export class Level extends MyComponent {
  /**
   * @param {Object} props
   * @property {String[]} classNames classNames from outer component
   * @property {Object} levelData stored data used for visualization
   */
  constructor({ classNames, levelData }) {
    super({
      classNames: [...classNames, 'level'],
    });

    const { iconLevelFragment, codeLevelFragment } =
      Level.createLevelFragments(levelData);

    this.display = new Display({ classNames: ['level__display'] });
    this.code = new Code({ classNames: ['level__code'] });

    this.renderLevel(levelData, iconLevelFragment, codeLevelFragment);
    this.appendChildren(this.display, this.code);
  }

  renderLevel(levelData, iconFragment, codeLevelFragment) {
    this.display.renderLevel(levelData, iconFragment);
    this.code.renderLevel(codeLevelFragment);
  }

  static createLevelFragments(level) {
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
    if (Array.isArray(layout)) {
      return layout.map((char) =>
        Level.processLevelCharacters(char, iconParent, codeParent)
      );
    }

    if (typeof layout === 'object' && layout !== null) {
      const result = new Character(layout);
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

      return result;
    }

    return layout;
  }
}
