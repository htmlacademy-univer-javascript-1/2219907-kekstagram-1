import { isEscape } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
let Msg;

export function closeMsg() {
  document.removeEventListener('keydown', onEscClose);
  document.removeEventListener('click', onOutsideClick);
  Msg.remove();
}

function onEscClose(evt) {
  if(isEscape(evt)) {
    closeMsg();
  }
}

function onOutsideClick(evt) {
  if (!Msg.querySelector('div').contains(evt.target)) {
    closeMsg();
  }
}
export function showMsg(isError) {
  Msg = isError ? errorTemplate.cloneNode(true) : successTemplate.cloneNode(true);

  document.body.append(Msg);

  Msg.querySelector('button').addEventListener('click', closeMsg);
  document.addEventListener('keydown', onEscClose);
  document.addEventListener('mouseup', onOutsideClick);
}
