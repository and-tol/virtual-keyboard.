/**
 * Function create template of keyboard
 */
const keyboardTemplate = () => {
  const keyboard = document.createElement('div');
  keyboard.setAttribute('id', 'keyboard');
  keyboard.classList.add('keyboard');
  return keyboard;
};

export default keyboardTemplate;
