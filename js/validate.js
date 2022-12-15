import { CheckStringLength, isEscape } from './util.js';

const hashTagRegEx = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

function validateHashTags(tags) {
  tags = tags.toLowerCase().split(' ');
  const uniqTags = [...new Set(tags)];

  return tags.every((tag) => hashTagRegEx.test(tag)) &&
  tags.length === uniqTags.length &&
  tags.length <= 5;
}

function validateComment(comment) {
  return CheckStringLength(comment, 140);
}

export function validateForm(form, hashI, commI) {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__text',
    errorClass: 'img-upload__text--invalid',
    successClass: 'img-upload__text--valid',
    errorTextParrent: 'img-upload__text',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error-text'
  },false);
  pristine.addValidator(hashI, validateHashTags, 'Максимальная длинна тега - 20 символов, максимум тегов - 5, теги через пробел');
  pristine.addValidator(commI, validateComment, 'Комментарий не должен превышать 140 символов.');
  return pristine.validate();
}

export function escOnFocus(evt) {
  if (isEscape(evt)) {
    evt.stopPropagation();
  }
}
