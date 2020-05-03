const getCapslockIndicator = () => document.querySelector('#capslock-light');

export const onCapsLockIndicator = () => {
  getCapslockIndicator().classList.add('light');
};
export const ofCapsLockIndicator = () => {
  getCapslockIndicator().classList.remove('light');
};
