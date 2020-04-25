/**
 * The function switches the keyboard language keeping position caps lock
 * @param {Number} length - number of possible languages on the keyboard
 * @param {Number} currLang - current Language on the keyboard
 */
export default function toggleLanguage(currLang, length) {
  let currentLang = currLang;
  currentLang += 1;
  currentLang = (currentLang + length) % length;
  document.querySelector('[data-key=Win]').dataset.lang = currentLang;
}
