import { sendData } from './api.js';
import { disableEditTools, enableEditTools } from './photoEdit.js';
import { BodyModalOpen, BodyModalClose, isEscape, onFail } from './util.js';
import './val.js';
import { pristineValidate, resetPristine } from './val.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('#upload-cancel');
const hashInput = form.querySelector('.text__hashtags');
const commInput = form.querySelector('.text__description');
const sendButton = form.querySelector('.img-upload__submit');

uploadInput.addEventListener('change', openForm);

function openForm() {
  //image.src = evt.target.files[0].getAsDataUrl();
  overlay.classList.remove('hidden');
  BodyModalOpen();
  enableEditTools();
  closeButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onEscClose);
  form.addEventListener('submit', onSubmitForm);
}

function closeForm() {
  overlay.classList.add('hidden');
  uploadInput.value = hashInput.value = commInput.value = '';
  BodyModalClose();
  disableEditTools();
  resetPristine();
  document.removeEventListener('keydown', onEscClose);
  closeButton.removeEventListener('click', closeForm);
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
    sendData(onSuccessSend, onFail, new FormData(form));
  }
}

function BlockSendButton() {
  sendButton.disabled = true;
}

function UnBlockSendButton() {
  sendButton.disabled = false;
}

function onSuccessSend() {
  console.log('Success');
  UnBlockSendButton();
  closeForm();
}
