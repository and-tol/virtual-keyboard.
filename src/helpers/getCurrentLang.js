/**
 * Function determines the current value of the virtual keyboard language
 */
const getCurrentLang = () => parseInt(document.querySelector('[data-key=Win]').dataset.lang, 10);

export default getCurrentLang;
