console.log('Hello!');

//
const body = document.querySelector('body');

// === create keyboard elements === //
// -- Container
const container = document.createElement('div');
container.setAttribute('id', 'container');
container.classList.add('container');

body.prepend(container);

// -- Textarea
const textarea = document.createElement('textarea');
textarea.setAttribute('id', 'textarea');
textarea.classList.add('textarea');

container.append(textarea);

// -- Keyboard
const keyboard = document.createElement('div');
keyboard.setAttribute('id', 'keyboard');
keyboard.classList.add('keyboard');

container.append(keyboard);

// -- Rows
const rowEngBtns = {
  Eng1Btns: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '=', 'Backspace'],
  Eng2Btns: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'Enter'],
  Eng3Btns: ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", '\\', ''],
  Eng4Btns: ['Shift', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  Eng5Btns: ['Ctr', 'Win', 'Alt', 'space', 'Alt', 'Ctr'],
};
const rowRusBtns = {
  Rus1: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '=', 'Backspace'],
  Rus2: ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Enter'],
  Rus3: ['CapsLock', 'Ф', ' Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '\\', 'Enter'],
  Rus4: ['Shift', '\\', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'Shift'],
  Rus5: ['Ctr', 'Win', 'Alt', 'space', 'Alt', 'Ctr'],
};

const specialSign = ['Backspace', 'Tab', 'Enter', 'Shift', 'CapsLock', 'Ctr', 'Win', 'Alt', 'Ctr'];

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

// const {
//   Eng1Btns, Eng2Btns, Eng3Btns, Eng4Btns, Eng5Btns,
// } = rowEngBtns;
// const {
//   Rus1, Rus2, Rus3, Rus4, Rus5,
// } = rowRusBtns;

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
    // + add style for special button
    if (sign === 'space') {
      div.classList.add('space');
    }
    specialSign.map((specSign) => {
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

function render(obj) {
  for (const key in obj) {
    const btns = obj[key];
    const row = renderRow(key, btns);
    keyboard.append(row);
  }
}

// English keyboard
render(rowEngBtns);
