/**
 * @param {String} selector
 * @returns {Boolean}
 */
export const isIntegerString = (string) => /^\d+/.test(string);

/**
 * @param {String} string
 * @param {Number} min
 * @param {Number} max
 * @returns {Boolean}
 */
export const isValidIntegerString = (string, min, max) => {
  const integer = parseInt(string, 10);
  return integer >= min && integer < max;
};
