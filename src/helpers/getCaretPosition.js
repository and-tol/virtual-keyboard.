function getCaretPos(obj) {
  // фокус в текстареа
  obj.focus();

  // свойство Node-объекта input & textarea
  if (obj.selectionStart) {
    return obj.selectionStart;
  }
  // ? Use window.getSelection()
  // ? const active = document.activeElement
  // active.id
  if (document.selection) {
    const sel = document.selection.createRange();
    const clone = sel.duplicate();
    sel.collapse(true);
    clone.moveToElementText(obj);
    clone.setEndPoint('EndToEnd', sel);
    return clone.text.length;
  }

  return 0;
}

function cleanForm() {
  // cs -> id элемента для вывода номера позиции курсора
  // ta -> id textarea
  document.getElementById('cs').value = getCaretPos(document.getElementById('ta'));
  setTimeout('cleanForm();', 100);
}

cleanForm();
