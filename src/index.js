console.log('Hello!');

//
// const isKeyPressed = (event) => {
//   ['Shift', '.', ',', 'Alt', 'AltGraph', 'ё', 'Ё', '\\', '/'].includes(event.key);
// };

let capslock = false;
let shift = false;
const lang = 'eng';
const engAbc = 'abcdefghijklmnopqrstuvwxyz';
const rusAbc = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

const simbolsCapsLockRus = 'Ё!"№;%:?/,';
// -- Buttons
const rowEngBtns = {
  Eng1Btns: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '=', 'Backspace'],
  Eng2Btns: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
  Eng3Btns: ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", '\\'],
  Eng4Btns: ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  Eng5Btns: ['CtrlLeft', 'Alt', 'space', 'Alt Gr', 'CtrlRight'],
};
const rowEngBtnsShift = {
  Eng1Btns: ['~', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  Eng2Btns: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
  Eng3Btns: ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '|'],
  Eng4Btns: ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift'],
  Eng5Btns: ['CtrlLeft', 'Alt', 'space', 'Alt Gr', 'CtrlRight'],
};
const rowEngBtns2 = {
  Eng1Btns: [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'Backspace'],
  Eng2Btns: ['Tab', 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 'Enter'],
  Eng3Btns: ['CapsLock', 65, 83, 68, 70, 71, 72, 74, 75, 76, 59, 39, 92, ''],
  Eng4Btns: ['Shift', 92, 90, 88, 67, 86, 66, 78, 77, 44, 46, 47, 'Shift'],
  Eng5Btns: ['Ctr', 'Win', 'Alt', 'space', 'Alt', 'Ctr'],
};
const rowRusBtns = {
  Rus1: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '=', 'Backspace'],
  Rus2: ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Enter'],
  Rus3: ['CapsLock', 'Ф', ' Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '\\', 'Enter'],
  Rus4: ['Shift', '\\', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'Shift'],
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

const body = document.querySelector('body');

// === create keyboard elements === //
// -- Container
const container = document.createElement('div');
container.setAttribute('id', 'container');
container.classList.add('container');

body.prepend(container);

// -- Textarea
let value = '';
/**
 * Function render textarea
 * @param {string} val
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

// -- Rows
/**
 * Function create row of keyboard
 * @param {String} id - id
 */
function rowTemplate(id) {
  const div = document.createElement('div');
  div.classList.add('row');
  div.setAttribute('id', `${id}`);
  return div;
}

/**
 * Function create row of keyboard
 * @param {String} row - name of keyboard row
 * @param {Array} btns - signs of keyboard buttons
 */
function renderRow(row, btns) {
  const lineRow = rowTemplate(row);

  btns.map((sign) => {
    // + create buttons
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

// function renderKeyboard(obj) {
//   for (const key in obj) {
//     const btns = obj[key];
//     const row = renderRow(key, btns);
//     keyboard.append(row);
//   }
// }
function renderKeyboard(key, language) {
  let obj = {};

  switch (true) {
    case key === false && language === 'eng':
      obj = rowEngBtns;
      break;
    case key === true && language === 'eng':
      obj = rowEngBtnsShift;
      break;

    default:
      break;
  }

  for (const key in obj) {
    const btns = obj[key];
    const row = renderRow(key, btns);
    keyboard.append(row);
  }
}

// Init English keyboard
renderKeyboard(shift, 'eng');

// Handlers
const mouseClickHandler = (event) => {
  // get buttons value
  let target = event.target.textContent.toLowerCase();
  const targetElement = event.target;
  const dataKey = targetElement.dataset.key;

  // -- Space -- //
  target = target === 'space' ? ' ' : target;

  // Shift
  if (dataKey === 'Shift') {
    console.log('capslock', capslock);

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
  }

  // -- Capslock -- //
  if (target === 'capslock') {
    capslock = !capslock;
    targetElement.classList.toggle('active');
  }
  // set signs to textarea -> TRUE
  if (capslock) {
    // get buttons value
    target = event.target.textContent;
    specialSigns.forEach((sign) => {
      target = sign.toLowerCase() === target.toLowerCase() ? '' : target;
    });
    value += target;
    document.querySelector('#textarea').value = value;
  } else {
    specialSigns.forEach((sign) => {
      target = sign.toLowerCase() === target.toLowerCase() ? '' : target;
    });
    value += target;
    document.querySelector('#textarea').value = value;
  }
  // --------- //
};

// -- Events
body.addEventListener('click', mouseClickHandler);
console.log('keyboard', keyboard);

{
  // onkeypress -> charCode, code;
  const keyboardA = [];
  // document.onkeypress = function (event) {
  //   keyboardA.push(event.charCode);
  //   console.log('keyboardA', keyboardA);
  // };
  // String.fromCharCode(keyboardA[i]);
}
