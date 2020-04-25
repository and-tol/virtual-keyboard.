import { blurTextarea } from '../helpers/focus';
import getCurrentLang from '../helpers/getCurrentLang';
import clickingButton from './clickingButton';
import toggleLanguage from './toggleLanguage';
import insertSignToTextarea from './insertSignToTextarea';
import renderTextarea from '../views/renderTextarea';
import keyboardConfig from '../config/keyboard.config';
import keyboardTemplate from '../views/keyboardTemplate';
import renderKeyboard from './renderKeyboard';

/**
 * Function handles clicks on the virtual keyboard.
 * @param {MouseEvent} event
 */
const mouseClickHandler = (event, txtarea, keyb, container) => {
  let keyboard = keyb;
  let textarea = txtarea;

  document.querySelector('[data-key=Win]').dataset.click = false;
  // const winClick = document.querySelector('[data-click=Win]').dataset.click;
  blurTextarea();
  const textareaValue = textarea.value;
  // get buttons value
  let target = event.target.dataset.key;
  const targetElement = event.target;
  const dataKey = targetElement.dataset.key;
  const row = targetElement.classList.contains('row');
  let currentLang = getCurrentLang();
  if (row) {
    target = '';
  }
  // Buttons animation
  if (dataKey) {
    clickingButton(targetElement);
  }

  // *-- Space --* //
  target = dataKey === 'space' ? ' ' : target;

  // *-- Shift --* //
  if (dataKey === 'Shift') {
    keyboardConfig.shift = !keyboardConfig.shift;
    currentLang = getCurrentLang();

    setTimeout(() => {
      keyboard.remove();
      keyboard = keyboardTemplate();
      renderKeyboard(keyboardConfig.shift, currentLang, keyboard, keyboardConfig.capslock);
      container.append(keyboard);
    }, keyboardConfig.specBtnTimeout);
  }

  // *-- Capslock --* //
  if (dataKey === 'CapsLock') {
    setTimeout(() => {
      keyboardConfig.capslock = !keyboardConfig.capslock;
      currentLang = getCurrentLang();

      keyboard.remove();
      keyboard = keyboardTemplate();
      renderKeyboard(keyboardConfig.shift, currentLang, keyboard, keyboardConfig.capslock);
      container.append(keyboard);
    }, keyboardConfig.specBtnTimeout);
  }

  // * Toggle language rus-eng * //
  if (dataKey === 'Win') {
    document.querySelector('[data-key=Win]').dataset.click = true;
    // const winClick = document.querySelector('[data-click=true]').dataset.click;

    setTimeout(() => {
      // document.querySelector('[data-key=Win]').removeAttribute('data-click');
      // delete document.querySelector('[data-key=Win]').dataset.click;
      document.querySelector('[data-key=Win]').dataset.click = false;
    }, 5000);
  }

  const winClick = document.querySelector('[data-key=Win]').dataset.click;

  if (winClick && dataKey === 'space') {
    setTimeout(() => {
      toggleLanguage(currentLang, keyboardConfig.lang.length);
      currentLang = getCurrentLang();
      localStorage.setItem('codeLang', currentLang.toString(10));

      keyboard.remove();
      keyboard = keyboardTemplate();
      renderKeyboard(keyboardConfig.shift, currentLang, keyboard, keyboardConfig.capslock);
      container.append(keyboard);
    }, keyboardConfig.specBtnTimeout);
  }

  // * Set signs to Textarea
  if (target !== undefined) {
    // Remove old textarea
    document.querySelector('#textarea').remove();
    textarea = renderTextarea(textareaValue);
    container.prepend(textarea);

    console.log('target', target);
    insertSignToTextarea(target, dataKey, textareaValue);
  }
};

export default mouseClickHandler;
