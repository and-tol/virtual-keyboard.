const getCapslockIndicator = () => document.querySelector('capslock__indicator');

export const onCapsLockIndicator = () => {
  getCapslockIndicator().classList.add('light');
};
export const ofCapsLockIndicator = () => {
  const capslockIndicator = getCapslockIndicator();
  capslockIndicator.classList.remove('light');
};
