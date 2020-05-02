import capslockIndicatorTemplate from '../views/capslockIndicatorTemplate';

const capslockIndicator = (capslock, container) => {
  // if (capslock) {
  // }
  container.insertAdjacentHTML('beforeEnd', capslockIndicatorTemplate);
  console.log('INDICATOR');
};

export default capslockIndicator;
