function GetRandomPositiveNumber(min, max) {
  if (min > max || max < 0 || min < 0) {
    throw new Error('Неверный аргумент');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// eslint-disable-next-line no-unused-vars
const CheckStringLength = (str, length) => str.length <= length;

export const isEscape = (evt) => evt.key === 'Escape';
export const BodyModalOpen = () => document.body.classList.add('modal-open');
export const BodyModalClose = () => document.body.classList.remove('modal-open');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export function onFail(err) {
  showAlert(`Ошибка загрузки изображений - ${err.status}`);
}

export {GetRandomPositiveNumber, CheckStringLength, showAlert};
