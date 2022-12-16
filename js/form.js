import { sendData } from './api.js';
import { disableEditTools, enableEditTools } from './photoEdit.js';
import { showMsg } from './stateMsg.js';
import { BodyModalOpen, BodyModalClose, isEscape } from './util.js';
import './val.js';
import { pristineValidate, resetPristine } from './val.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('#upload-cancel');
const hashInput = form.querySelector('.text__hashtags');
const commInput = form.querySelector('.text__description');
const sendButton = form.querySelector('.img-upload__submit');
const image = form.querySelector('.img-upload__preview img');
let isAfterError = false;
uploadInput.addEventListener('change', openForm);

function openForm(evt) {
  image.src = URL.createObjectURL(evt.target.files[0]);
  overlay.classList.remove('hidden');
  BodyModalOpen();
  UnBlockSendButton();
  document.addEventListener('keydown', onEscClose);
  closeButton.addEventListener('click', closeForm);
  form.addEventListener('submit', onSubmitForm);
  if (isAfterError) {
    isAfterError = false;
    return; }
  enableEditTools();
}

export function closeForm() {
  overlay.classList.add('hidden');
  uploadInput.value = '';
  BodyModalClose();
  resetPristine();
  document.removeEventListener('keydown', onEscClose);
  closeButton.removeEventListener('click', closeForm);
  if (isAfterError) { return; }
  hashInput.value = commInput.value = '';
  disableEditTools();
}

function onEscClose(evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

function onSubmitForm(evt) {
  evt.preventDefault();
  if (pristineValidate()) {
    BlockSendButton();
    sendData(onSuccessSend, onFailSend, new FormData(form));
  }
}

function BlockSendButton() {
  sendButton.disabled = true;
}

function UnBlockSendButton() {
  sendButton.disabled = false;
}

function onSuccessSend() {
  closeForm();
  showMsg(false);
}

function onFailSend() {
  isAfterError = true;
  closeForm();
  showMsg(true);
}
