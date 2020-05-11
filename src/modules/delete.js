import renderTextarea from '../views/renderTextarea';
import { container } from '../views/container';

const deleteSign = (event) => {
  // key Delete
  if (event.keyCode === 46) {
    const text = document.querySelector('#textarea').value;
    console.log('text', text);

    const value = text.slice(0, -1);
    console.log('value', value);
    // Remove old textarea
    document.querySelector('#textarea').remove();
    const textarea = renderTextarea(value);
    console.log('textarea', textarea)
    container.prepend(textarea);

    // ! keyboardConfig.textareaValue
  }
};

export default deleteSign;
