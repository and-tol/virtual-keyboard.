import { specialSigns } from '../config/keyboardSigns';
import renderTextarea from '../views/renderTextarea';

/**
 * Function that adds characters typed on the virtual keyboard with the mouse
 * @param {string} targetValue - signs on button of keyboard
 * @param {string} dataKey - key button of keyboard
 * @param {string} value - The string entered from the keyboard into the textarea
 */
export default function insertSignToTextarea(targetValue, dataKey, value) {
  let targetClick = targetValue;

  // -- Backspace -- //
  if (dataKey === 'Backspace') {
    value = value.slice(0, value.length - 1);
  }

  specialSigns.forEach((sign) => {
    if (sign === undefined || dataKey === undefined) {
      return;
    }
    targetClick = sign.toLowerCase() === dataKey.toLowerCase() ? '' : targetClick;
  });

  targetClick = dataKey === 'Tab' ? '    ' : targetClick;

  value += targetClick;
  document.querySelector('#textarea').value = value;

  renderTextarea(value);
}
