import { container, wrapper } from './views/container';
import clickingButton from './modules/clickingButton';
import renderTextarea from './views/renderTextarea';
import keyboardTemplate from './views/keyboardTemplate';
import renderKeyboard from './modules/renderKeyboard';
import toggleLanguage from './modules/toggleLanguage';
import insertSignToTextarea from './modules/insertSignToTextarea';
import keyboardConfig from './config/keyboard.config';
import getCurrentLang from './helpers/getCurrentLang';
import { focusTextarea, blurTextarea } from './helpers/focusTexarea';
import setCapsLock from './modules/setCapsLock';
import reRenderKeyboard from './modules/reRenderKeyboard';
import capslockIndicatorTemplate from './views/capslockIndicatorTemplate';
import { onCapsLockIndicator, ofCapsLockIndicator } from './modules/toggleCapsLockIndicator';
import deleteSign from './modules/delete';
import languageIndicatorTemplate from './views/languageIndicatorTemplate';
// import mouseClickHandler from './modules/mouseClickHandler';

console.log('Hello!');

const body = document.querySelector('body');
body.prepend(wrapper);
wrapper.prepend(container);

// *-- Init Textarea -- //
let textarea = renderTextarea(keyboardConfig.textareaValue);
container.append(textarea);

// *-- Init Keyboard -- //
let keyboard = keyboardTemplate();
container.append(keyboard);
// -- Init Keyboard Indicator -- //
wrapper.insertAdjacentHTML('beforeend', capslockIndicatorTemplate);
// if (keyboardConfig.capslock === true) {
//   onCapsLockIndicator();
// }

// * Init Keyboard lang from localstorage
// if (!localStorage.getItem('codeLang')) {
if (localStorage.getItem('codeLang') === null) {
  // Init English keyboard
  localStorage.setItem('codeLang', '0');
}
let lang = Number(localStorage.getItem('codeLang'));
wrapper.insertAdjacentHTML('beforeend', languageIndicatorTemplate(lang));

renderKeyboard(keyboardConfig.shift, lang, keyboard, keyboardConfig.capslock);

// * Handlers
/**
 * Function handles clicks on the virtual keyboard.
 * @param {MouseEvent} event
 */
const mouseClickHandler = (event) => {
  // set key Windows "false"
  document.querySelector('[data-key=Win]').dataset.click = false;
  // const winClick = document.querySelector('[data-click=Win]').dataset.click;
  // blurTextarea();

  const textareaValue = textarea.value;
  // set language to keyboard from local storage
  lang = Number(localStorage.getItem('codeLang'));
  // get buttons value
  let target = event.target.dataset.key;
  const targetElement = event.target;
  const dataKey = targetElement.dataset.key;
  const row = targetElement.classList.contains('row');
  let currentLang = getCurrentLang();
  const indicatorCL = document.querySelector('#capslock-light');

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
    // currentLang = getCurrentLang();
    if (lang !== currentLang) {
      currentLang = lang;
    }

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
      // currentLang = getCurrentLang();
      if (lang !== currentLang) {
        currentLang = lang;
      }
      // localStorage.setItem('codeLang', '1');

      keyboard.remove();
      keyboard = keyboardTemplate();
      renderKeyboard(keyboardConfig.shift, currentLang, keyboard, keyboardConfig.capslock);
      container.append(keyboard);

      if (keyboardConfig.capslock === true) {
        onCapsLockIndicator();
      } else {
        ofCapsLockIndicator();
      }
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
      console.log('currentLang', currentLang);
      //  change keyboard language layout
      keyboard.remove();
      keyboard = keyboardTemplate();
      renderKeyboard(keyboardConfig.shift, currentLang, keyboard, keyboardConfig.capslock);
      container.append(keyboard);

      // change language indicator
      const languageIndicator = document.querySelector('.language-indicator');
      languageIndicator.remove();
      wrapper.insertAdjacentHTML('beforeend', languageIndicatorTemplate(currentLang));
    }, keyboardConfig.specBtnTimeout);
  }
  // *

  // * Set signs to Textarea
  if (target !== undefined) {
    // Remove old textarea
    document.querySelector('#textarea').remove();
    textarea = renderTextarea(textareaValue);
    container.prepend(textarea);

    insertSignToTextarea(target, dataKey, textareaValue);
  }

  // ! Delete signs from Textarea
  // if (taget===) {

  // }
};

// -- Events
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('textarea').focus();

  body.addEventListener('click', mouseClickHandler);
  // body.addEventListener('click', (event) => {
  //   mouseClickHandler(event, textarea, keyboard, container);
  // });
  body.addEventListener('click', focusTextarea);

  // установливаем CapsLock с физической клавиатуры
  body.addEventListener('keyup', (event) => {
    setCapsLock(event, keyboardConfig);
  });

  // TODO: удаление клавишей DEL на виртуальной клавиатуре
  // body.addEventListener('keydown', deleteSign)

  /**
   * определяем язык, устанавливаем язык в config
   */
  const setLanguageToConfig = (event) => {
    // localStorage.setItem('codeLang', currentLang.toString(10));
    lang = Number(localStorage.getItem('codeLang'));

    //  определяем русский язык
    if (/^[а-яА-Я]+$/.test(event.key)) {
      keyboardConfig.currentLang = 'rus';
      localStorage.setItem('codeLang', '1');

      reRenderKeyboard(keyboard, 1);
    } else {
      keyboardConfig.currentLang = 'eng';
      localStorage.setItem('codeLang', '0');

      reRenderKeyboard(keyboard, 0);
    }
  };

  body.addEventListener('keyup', (event) => {
    // localStorage.setItem('codeLang', currentLang.toString(10));
    lang = Number(localStorage.getItem('codeLang'));

    //  определяем русский язык
    if (/^[а-яА-Я]+$/.test(event.key)) {
      keyboardConfig.currentLang = 'rus';
      localStorage.setItem('codeLang', '1');

      keyboard.remove();
      keyboard = keyboardTemplate();
      renderKeyboard(keyboardConfig.shift, 1, keyboard, keyboardConfig.capslock);
      container.append(keyboard);
    } else {
      keyboardConfig.currentLang = 'eng';
      localStorage.setItem('codeLang', '0');

      keyboard.remove();
      keyboard = keyboardTemplate();
      renderKeyboard(keyboardConfig.shift, 0, keyboard, keyboardConfig.capslock);
      container.append(keyboard);
    }
  });

  // TODO: считывание позиции курсора
  const getCursorPosition = () => {};
  body.addEventListener('click', getCursorPosition);
});
