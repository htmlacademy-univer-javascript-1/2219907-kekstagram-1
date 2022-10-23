function GetRandomPositiveNumber(min, max) {
  if (min > max || max < 0 || min < 0) {
    throw new Error('Неверный аргумент');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// eslint-disable-next-line no-unused-vars
const CheckStringLength = (str, length) => str.length <= length;

export {GetRandomPositiveNumber, CheckStringLength};
