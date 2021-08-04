import { WIDTH_VALUE } from '@constants';

/**
 * @param {CodeMirror} cm CodeMirror instance
 */
export const refreshCodeMirror = (cm) => {
  const cmDisplaySizer = cm.display.sizer;

  cmDisplaySizer.style.minWidth = WIDTH_VALUE;
  cmDisplaySizer.style.maxWidth = WIDTH_VALUE;
  cmDisplaySizer.style.width = WIDTH_VALUE;
  cm.refresh();
};
