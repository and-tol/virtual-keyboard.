function getCaretStartPos(obj) {
  // фокус в текстареа
  obj.focus();

  // свойство Node-объекта input & textarea
  if (obj.selectionStart) {
    // position, start with 0
    return obj.selectionStart;
  }

  return 0;
}

export default getCaretStartPos;
