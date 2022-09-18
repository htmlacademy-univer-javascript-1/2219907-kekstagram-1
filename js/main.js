/* eslint-disable no-console */
function getRandomNumber(min, max) {
  if (min > max || max < 0 || min < 0) { return -1; }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isCommentLengthCorrect(str, length) {
  return str.length <= length;
}

console.log(getRandomNumber(23,234));
console.log(isCommentLengthCorrect('aaa',21));
