import hljs from 'highlight.js';

export const highlight = (str) => {
  const hl = hljs.highlight(str, { language: 'html', ignoreIllegals: true });
  return hl.value;
};
