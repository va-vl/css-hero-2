/**
 * retrieves item from storage by key
 * @param {String} key
 * @returns {string}
 */
export const get = (key) => {
  if (typeof key !== 'string') {
    throw new TypeError('Local storage keys can be only strings!');
  }

  const item = localStorage.getItem(key);

  try {
    return JSON.parse(item);
  } catch {
    return item;
  }
};

/**
 * sets item to storage
 * @param {string} key storage key
 * @param {any} value storage value
 */
export const set = (key, value) => {
  if (typeof key !== 'string') {
    throw new TypeError('Local storage keys can be only strings!');
  }

  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * remove item from storage by key
 * @param {string} key
 * @returns {void}
 */
export const remove = (key) => {
  if (typeof key !== 'string') {
    throw new TypeError('Local storage keys can be only strings!');
  }

  localStorage.removeItem(key);
};
