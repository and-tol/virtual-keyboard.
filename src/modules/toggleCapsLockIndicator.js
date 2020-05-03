const getCapslockIndicator = () => {
  console.log('get');
  return document.querySelector('capslock-indicator');
};

export const onCapsLockIndicator = () => {
  console.log('ligth', getCapslockIndicator());
  getCapslockIndicator().classList.add('light');
};
export const ofCapsLockIndicator = () => {
  const capslockIndicator = getCapslockIndicator();
  capslockIndicator.classList.remove('light');
};
