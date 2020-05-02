const setCapsLock = (event, kbConf) => {
  const keyboardConfig = kbConf;
  const keyboardEnabled = event.getModifierState('CapsLock');
  keyboardConfig.capslock = keyboardEnabled;
};

export default setCapsLock;
