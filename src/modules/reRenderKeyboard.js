import keyboardTemplate from '../views/keyboardTemplate';
import keyboardConfig from '../config/keyboard.config';
// import {container} from '../views/container';
import renderKeyboard from './renderKeyboard';

/**
 * Перерендер виртуальной клавиатуры
 * @param {HTMLDivElement} kb - Virtual keyboard Node
 * @param {number} lg - Language of keyboard input
 */
const reRenderKeyboard = (kb, lg) => {
  let keyboard = kb;
  keyboard.remove();
  keyboard = keyboardTemplate();
  renderKeyboard(keyboardConfig.shift, lg, keyboard, keyboardConfig.capslock);
  container.append(keyboard);
  // keyboard.insertAdjacentHTML('afterend', capslockIndicatorTemplate);
};
export default reRenderKeyboard;
