import { Character } from './Character/Character';

/**
 * processLevelCharacters is based on the deep cloning algorithm from
 * https://stackoverflow.com/a/28876564
 * @param {Object[]} layout array of characters as objects parsed from level JSON
 * @param {Node} iconVisualizationParent
 * @param {Node} codeVisualizationParent
 * @returns {Character|Character[]}
 */
const visualizeLevelLayout = (
  layout,
  iconVisualizationParent,
  codeVisualizationParent
) => {
  if (Array.isArray(layout)) {
    return layout.map((character) =>
      visualizeLevelLayout(
        character,
        iconVisualizationParent,
        codeVisualizationParent
      )
    );
  }

  if (typeof layout === 'object' && layout !== null) {
    const character = new Character(layout);
    const { characterIcon, characterCode, openingTagString, closingTagString } =
      character;

    iconVisualizationParent.append(characterIcon);

    characterCode.insertAdjacentHTML('afterBegin', openingTagString);

    if (layout.children && layout.children.length) {
      character.children = visualizeLevelLayout(
        layout.children,
        characterIcon,
        characterCode
      );
    }

    if (closingTagString) {
      characterCode.insertAdjacentHTML('beforeEnd', closingTagString);
    }

    codeVisualizationParent.appendChild(characterCode);

    return character;
  }

  return layout;
};

/**
 * @param {Object} level
 * @returns {[DocumentFragment, DocumentFragment]} iconLevelFragment and codeLevelFragment
 */
export const createLevelVisualization = (level) => {
  const iconLevelFragment = new DocumentFragment();
  const codeLevelFragment = new DocumentFragment();

  visualizeLevelLayout(level.layout, iconLevelFragment, codeLevelFragment);

  return [iconLevelFragment, codeLevelFragment];
};
