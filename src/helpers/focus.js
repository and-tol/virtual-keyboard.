/**
 * Set focus in textarea
 */
export const focusTextarea = () => {
  const textareaToFocus = document.getElementById('textarea');
  textareaToFocus.focus();
};

/**
 * Remove focus (blur) in textarea
 */
export const blurTextarea = () => {
  const textareaToFocus = document.getElementById('textarea');
  textareaToFocus.blur();
};
