/**
 * Function render textarea
 * @param {string} value - Value signs in textarea
 */
export default function renderTextarea(value) {
  const textarea = document.createElement('textarea');
  textarea.setAttribute('id', 'textarea');
  textarea.setAttribute('value', value);
  textarea.setAttribute('autofocus', 'true');
  textarea.classList.add('textarea');
  // textarea.focus();

  return textarea;
}
