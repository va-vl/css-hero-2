import hljs from 'highlight.js';

export const highlight = (str) => {
  const hl = hljs.highlight('html', str, true);
  return hl.value;
};
