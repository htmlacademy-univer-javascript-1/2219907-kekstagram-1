import { disableEditTools, enableEditTools } from './photoEdit.js';
import { BodyModalOpen, BodyModalClose, isEscape } from './util.js';
import './val.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const image = form.querySelector('.img-upload__preview img');
const closeButton = form.querySelector('#upload-cancel');
const hashInput = form.querySelector('.text__hashtags');
const commInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

uploadInput.addEventListener('change', openForm);

function openForm(evt) {
  //image.src = evt.target.files[0].getAsDataUrl();
  overlay.classList.remove('hidden');
  BodyModalOpen();
  enableEditTools();
  closeButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onEscClose);
  //form.addEventListener('submit', onSubmitForm);

}

function closeForm(evt) {
  overlay.classList.add('hidden');
  uploadInput.value = hashInput.value = commInput.value = '';
  BodyModalClose();
  disableEditTools();
  document.removeEventListener('keydown', onEscClose);
  closeButton.removeEventListener('click', closeForm);
}

function onEscClose(evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

/* function onSubmitForm(evt) {
  evt.preventDefault();

  if (validateForm(form, hashInput, commInput)) {
    submitButton.disabled = true;
  }
} */


