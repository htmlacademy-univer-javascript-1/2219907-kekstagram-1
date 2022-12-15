import { BodyModalOpen, BodyModalClose, isEscape } from './util.js';
import './val.js';

const formContainer = document.querySelector('.img-upload__form');
const uploadInput = formContainer.querySelector('#upload-file');
const overlay = formContainer.querySelector('.img-upload__overlay');
const image = formContainer.querySelector('.img-upload__preview img');
const closeButton = formContainer.querySelector('#upload-cancel');
const hashInput = formContainer.querySelector('.text__hashtags');
const commInput = formContainer.querySelector('.text__description');
const submitButton = formContainer.querySelector('.img-upload__submit');

uploadInput.addEventListener('change', openForm);

function openForm(evt) {
  //image.src = evt.target.files[0].getAsDataUrl();
  overlay.classList.remove('hidden');
  BodyModalOpen();
  closeButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onEscClose);
  //formContainer.addEventListener('submit', onSubmitForm);
}

function closeForm(evt) {
  overlay.classList.add('hidden');
  uploadInput.value = '';
  BodyModalClose();
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

  if (validateForm(formContainer, hashInput, commInput)) {
    submitButton.disabled = true;
  }
} */

