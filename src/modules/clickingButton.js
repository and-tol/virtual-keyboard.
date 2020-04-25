/**
 * Function animates button presses
 * @param {EventTarget} elem - Markup element
 */
export default function clickingButton(elem) {
  elem.classList.add('active');

  setTimeout(() => {
    elem.classList.remove('active');
  }, 300);
}
