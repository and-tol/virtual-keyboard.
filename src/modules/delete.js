import renderTextarea from '../UI/renderTextarea';
import { container } from '../UI/container';

const deleteSign = (cursorPosition, dataKey) => {
  console.log('cursorPosition', cursorPosition)
  switch (dataKey) {
    case 'Del':
      const text = document.querySelector('#textarea').value.split('');

      const newText = [
        ...text.slice(0, cursorPosition),
        ...text.slice(cursorPosition +1),
      ].join('')

      // Remove old textarea
      document.querySelector('#textarea').remove();
      const textarea = renderTextarea(newText);
      console.log('textarea', textarea);
      container.prepend(textarea);

      // ! keyboardConfig.textareaValue
      break;
    case 'Backspace':
      break;

    default:
      break;
  }

  // key Delete
  if (event.keyCode === 46) {
    const text = document.querySelector('#textarea').value;
    console.log('text', text);

    const value = text.slice(0, -1);
    console.log('value', value);
    // Remove old textarea
    document.querySelector('#textarea').remove();
    const textarea = renderTextarea(value);
    console.log('textarea', textarea);
    container.prepend(textarea);

    // ! keyboardConfig.textareaValue
  }
};

export default deleteSign;
