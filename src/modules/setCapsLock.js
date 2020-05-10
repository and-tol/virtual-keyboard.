import { onCapsLockIndicator, ofCapsLockIndicator } from './toggleCapsLockIndicator';

/**
 * Function put in keyboard configuration the mean of capslock
 * @param {Event} event - Key event
 * @param {Object} kbConf - Keyboard configuration -> keyboardConfig
 */
const setCapsLock = (event, kbConf) => {
  const keyboardConfig = kbConf;
  keyboardConfig.capslock = event.getModifierState('CapsLock');

  // keyboardConfig.capslock ? onCapsLockIndicator() : ofCapsLockIndicator();

  if (keyboardConfig.capslock) {
    onCapsLockIndicator();
  } else {
    ofCapsLockIndicator();
  }
};

export default setCapsLock;
