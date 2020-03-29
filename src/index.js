console.log('Hello!');

// -- Buttons
const rowEngBtns = {
  Eng1Btns: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '=', 'Backspace'],
  Eng2Btns: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
  Eng3Btns: ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", '\\'],
  Eng4Btns: ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  Eng5Btns: ['CtrlLeft', 'Win', 'Alt', 'space', 'Alt Gr', 'CtrlRight'],
};
const rowEngBtnsShift = {
  Eng1Btns: ['~', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  Eng2Btns: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
  Eng3Btns: ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '|'],
  Eng4Btns: ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift'],
  Eng5Btns: ['CtrlLeft', 'Win', 'Alt', 'space', 'Alt Gr', 'CtrlRight'],
};

const rowRusBtns = {
  Rus1: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '=', 'Backspace'],
  Rus2: ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
  Rus3: ['CapsLock', 'Ф', ' Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '\\'],
  Rus4: ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'Shift'],
  Rus5: ['Ctr', 'Win', 'Alt', 'space', 'Alt', 'Ctr'],
};
const rowRusBtnsShift = {
  Rus1: ['~', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  Rus2: ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
  Rus3: ['CapsLock', 'Ф', ' Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '\\'],
  Rus4: ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'Shift'],
  Rus5: ['Ctr', 'Win', 'Alt', 'space', 'Alt', 'Ctr'],
};

const specialSigns = [
  'Backspace',
  'Tab',
  'Alt',
  'Enter',
  'Shift',
  'CapsLock',
  'CtrlLeft',
  'Win',
  'Alt Gr',
  'CtrlRight',
];

let capslock = false;
let shift = false;
let alt = false;
let lang = 'eng';
let value = '';

const body = document.querySelector('body');

// === create keyboard elements === //
// -- Container -- //
const container = document.createElement('div');
container.setAttribute('id', 'container');
container.classList.add('container');

body.prepend(container);

// -- Textarea -- //
/**
 * Function render textarea
 * @param {string} val - Value signs in textarea
 */
function renderTextarea(val) {
  const textarea = document.createElement('textarea');
  textarea.setAttribute('id', 'textarea');
  textarea.setAttribute('value', val);
  textarea.classList.add('textarea');

  return textarea;
}
const textarea = renderTextarea(value);
container.append(textarea);

// -- Keyboard
const keyboardTemplate = () => {
  const keyboard = document.createElement('div');
  keyboard.setAttribute('id', 'keyboard');
  keyboard.classList.add('keyboard');
  return keyboard;
};
let keyboard = keyboardTemplate();
container.append(keyboard);

// -- Rows -- //
/**
 * Function create row of keyboard
 * @param {String} row - name of keyboard row
 * @param {Array} btns - signs of keyboard buttons
 */
function renderRow(btns) {
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
 * @param {boolean} key
 * @param {string} language
 */
function renderKeyboard(key, language) {
  let obj = {};

  switch (true) {
    case key === false && language === 'eng':
      obj = rowEngBtns;
      break;
    case key === true && language === 'eng':
      obj = rowEngBtnsShift;
      break;
    case key === false && language === 'rus':
      obj = rowRusBtns;
      break;
    case key === true && language === 'rus':
      obj = rowRusBtnsShift;
      break;

    default:
      break;
  }

  for (const key in obj) {
    const btns = obj[key];
    const row = renderRow(btns);
    keyboard.append(row);
  }
}

/**
 * Function that adds characters typed on the virtual keyboard with the mouse
 * @param {string} targetValue
 * @param {string} dataKey
 */
function insertSignToTextarea(targetValue, dataKey) {
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
  targetClick = dataKey.toLowerCase() === 'tab' ? '    ' : targetClick;

  value += targetClick;
  document.querySelector('#textarea').value = value;

  renderTextarea(value);
}

/**
 * The function switches the keyboard language keeping position caps lock
 * @param {boolean} shiftKey - shift position
 * @param {string} language - keyboard language
 */
function toggleLanguage(shiftKey, language) {
  // document.querySelector('[data-key=Win]').classList.toggle('active');
  keyboard.remove();
  keyboard = keyboardTemplate();
  renderKeyboard(shiftKey, language);
  container.append(keyboard);

  if (capslock) {
    document.querySelector('[data-key=CapsLock]').classList.add('active');
  }
}

/**
 * Function animates button presses
 * @param {Element} elem - Markup element
 */
function clickingButton(elem) {
  elem.classList.add('active');

  setTimeout(() => {
    elem.classList.remove('active');
  }, 300);
}

// Init English keyboard
renderKeyboard(shift, 'eng');

// Handlers
/**
 * Function handles clicks on the virtual keyboard.
 * @param {MouseEvent} event
 */
const mouseClickHandler = (event) => {
  // get buttons value
  let target = '';
  target = event.target.textContent.toLowerCase();
  const targetElement = event.target;
  const dataKey = targetElement.dataset.key;
  const row = targetElement.classList.contains('row');
  if (row) {
    target = '';
  }

  // Buttons animation
  if (dataKey !== 'CapsLock') {
    clickingButton(targetElement);
  }

  // -- Space -- //
  target = dataKey === 'space' ? ' ' : target;

  // Shift
  if (dataKey === 'Shift') {
    shift = !shift;
    keyboard.remove();
    keyboard = keyboardTemplate();
    renderKeyboard(shift, 'eng');
    container.append(keyboard);

    if (shift) {
      const shifts = document.querySelectorAll('[data-key=Shift]');
      shifts.forEach((key) => {
        key.classList.add('active');
      });
    }
    if (capslock) {
      document.querySelector('[data-key=CapsLock]').classList.add('active');
    }
    if (alt) {
      document.querySelector('[data-key=Alt]').classList.add('active');
    }
  }

  // -- Capslock -- //
  if (dataKey === 'CapsLock') {
    capslock = !capslock;
    targetElement.classList.toggle('active');
  }

  // -- Alt -- //
  if (dataKey === 'Alt') {
    alt = !alt;
    document.querySelector('[data-key=Alt]').classList.toggle('active');
  }

  // Toggle language rus-eng
  if (dataKey === 'Win') {
    document.querySelector('[data-key=Win]').classList.add('active');
    console.log('win');
  }
  const win = document.querySelector('.active[data-key=Win]');
  if (win && dataKey === 'space') {
    switch (true) {
      case lang === 'eng':
        lang = 'rus';
        toggleLanguage(shift, lang);
        target = '';
        break;

      case lang === 'rus':
        lang = 'eng';
        toggleLanguage(shift, lang);
        target = '';
        break;

      default:
        break;
    }
  }

  // Set signs to Textarea -> TRUE
  if (capslock) {
    // get buttons value
    target = target.toUpperCase();

    // -- Space -- //
    target = dataKey === 'space' ? ' ' : target;

    insertSignToTextarea(target, dataKey);
  } else {
    const textareaOld = document.querySelector('#textarea');
    textareaOld.remove();

    const textareaNew = renderTextarea(value);
    container.prepend(textareaNew);

    insertSignToTextarea(target, dataKey);
  }
  // --------- //
};
// -- Events
body.addEventListener('click', mouseClickHandler);
