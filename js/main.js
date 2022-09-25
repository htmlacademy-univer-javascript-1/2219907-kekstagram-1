/* eslint-disable no-console */
function getRandomNumber(min, max) {
  if (min > max || max < 0 || min < 0) {
    throw new Error('Неверный аргумент');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const CheckStringLength = (str, length) => str.length <= length;

console.log(getRandomNumber(-23,234));
console.log(CheckStringLength('aaa',21));
