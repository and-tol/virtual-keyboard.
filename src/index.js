import container from './views/container';
import clickingButton from './modules/clickingButton';
import renderTextarea from './views/renderTextarea';
import keyboardTemplate from './views/keyboardTemplate';
import renderKeyboard from './modules/renderKeyboard';
import toggleLanguage from './modules/toggleLanguage';
import insertSignToTextarea from './modules/insertSignToTextarea';
import keyboardConfig from './config/keyboard.config';
import getCurrentLang from './helpers/getCurrentLang';
import { focusTextarea, blurTextarea } from './helpers/focus';
// import mouseClickHandler from './modules/mouseClickHandler';

console.log('Hello!');

const body = document.querySelector('body');
body.prepend(container);

// -- Init Textarea -- //
let textarea = renderTextarea(keyboardConfig.value);
container.append(textarea);

// -- Init Keyboard -- //
let keyboard = keyboardTemplate();
container.append(keyboard);

if (!localStorage.getItem('codeLang')) {
  // Init English keyboard
  localStorage.setItem('codeLang', '0');
}
const lang = Number(localStorage.getItem('codeLang'));

renderKeyboard(keyboardConfig.shift, lang, keyboard, keyboardConfig.capslock);

// Handlers
/**
 * Function handles clicks on the virtual keyboard.
 * @param {MouseEvent} event
 */
const mouseClickHandler = (event) => {
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
    kb.shift = !kb.shift;
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

// -- Events
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('textarea').focus();

  body.addEventListener('click', mouseClickHandler);
  // body.addEventListener('click', (event) => {
  //   mouseClickHandler(event, textarea, keyboard, container);
  // });
  body.addEventListener('click', focusTextarea);

  // ловим событие клавиши "keyup" ->"CapsLock"
  body.addEventListener('keyup', (event) => {
    const keyboardEnabled = event.getModifierState('CapsLock');
    keyboardConfig.capslock = keyboardEnabled;
  });
});
