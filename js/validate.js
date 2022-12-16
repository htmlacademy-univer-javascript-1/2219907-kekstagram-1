import { CheckStringLength, isEscape } from './util.js';

const hashTagRegEx = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const form = document.querySelector('.img-upload__form');
const hashInput = form.querySelector('.text__hashtags');
const commInput = form.querySelector('.text__description');

const validateComment = (comment) => CheckStringLength(comment, 140);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});
pristine.addValidator(hashInput, validateHashTags, 'Максимальная длинна тега - 20 символов, максимум тегов - 5, теги через пробел');
pristine.addValidator(commInput, validateComment, 'Комментарий не должен превышать 140 символов.');

hashInput.onkeydown = escOnFocus;
commInput.onkeydown = escOnFocus;

function validateHashTags(tags) {
  if (tags === '') {return true;}
  tags = tags.toLowerCase().split(' ');
  const uniqTags = [...new Set(tags)];

  return tags.every((tag) => hashTagRegEx.test(tag)) &&
  tags.length === uniqTags.length &&
  tags.length <= 5;
}

export function escOnFocus(evt) {
  if (isEscape(evt)) {
    evt.stopPropagation();
  }
}

export const pristineValidate = () => pristine.validate();
export const resetPristine = () => pristine.reset();
