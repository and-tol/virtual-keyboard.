import {
  rowEngBtns,
  rowEngBtnsCapslock,
  rowEngBtnsShift,
  rowEngBtnsShiftCapslock,
  rowRusBtns,
  rowRusBtnsCapslock,
  rowRusBtnsShift,
  rowRusBtnsShiftCapslock,
  specialSigns,
} from '../config/keyboardSigns';
import capslockIndicatorTemplate from '../UI/capslockIndicatorTemplate'

/**
 * Function create row for keyboard
 * @param {Array} btns - signs of keyboard buttons
 */
function renderRow(btns, lang) {
  // + create row
  const lineRow = document.createElement('div');
  lineRow.classList.add('row');

  // + create buttons
  btns.map((sign) => {
    const div = document.createElement('div');
    div.classList.add('btn');
    div.textContent = sign;
    div.dataset.key = sign;

    // + add style for special button
    if (sign === 'space') {
      div.classList.add('space');
      div.textContent = '';
    }
    if (sign === 'CtrlLeft' || sign === 'CtrlRight') {
      div.textContent = 'Ctrl';
    }
    if (sign === 'Win') {
      div.dataset.lang = lang;
    }
    specialSigns.forEach((specSign) => {
      if (sign === specSign) {
        div.classList.add('special');
      }
    });

    // + add button in row
    lineRow.append(div);

    return div;
  });

  return lineRow;
}

/**
 * Function that renders a keyboard based on the position of the Shift and the language
 * @param {boolean} shiftkey
 * @param {Number} language
 * @param {HTMLDivElement} keyboard
 * @param {boolean} capslock
 */
function renderKeyboard(shiftkey, language, keyboard, capslock) {
  let obj = {};

  switch (true) {
    // eng keybord
    case shiftkey === false && language === 0 && capslock === true:
      obj = rowEngBtnsCapslock;
      break;
    case shiftkey === true && language === 0 && capslock === true:
      obj = rowEngBtnsShiftCapslock;
      break;
    case shiftkey === false && language === 0 && capslock === false:
      obj = rowEngBtns;
      break;
    case shiftkey === true && language === 0 && capslock === false:
      obj = rowEngBtnsShift;
      break;
    // rus keyboard
    case shiftkey === false && language === 1 && capslock === true:
      obj = rowRusBtnsCapslock;
      break;
    case shiftkey === true && language === 1 && capslock === true:
      obj = rowRusBtnsShiftCapslock;
      break;
    case shiftkey === false && language === 1 && capslock === false:
      obj = rowRusBtns;
      break;
    case shiftkey === true && language === 1 && capslock === false:
      obj = rowRusBtnsShift;
      break;

    default:
      break;
  }

  Object.entries(obj).forEach((row) => {
    keyboard.append(renderRow(row[1], language));
  });
}

export default renderKeyboard;
