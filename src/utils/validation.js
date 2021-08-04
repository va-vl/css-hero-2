/**
 * @param {String} selector
 * @returns {Boolean}
 */
export const isIntegerString = (string) =>
  String(parseInt(string, 10)) === string;

/**
 * @param {String} string
 * @param {Number} min
 * @param {Number} max
 * @returns {Boolean}
 */
export const isValidIntegerString = (string, min, max) => {
  const integer = Number(string);
  return integer >= min && integer < max;
};
