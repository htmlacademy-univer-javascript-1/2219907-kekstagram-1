function GetRandomPositiveNumber(min, max) {
  if (min > max || max < 0 || min < 0) {
    throw new Error('Неверный аргумент');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function GetRandomMassivElements(array, quantity) {
  array = array.slice();
  for (let i = 0 ; (i < quantity) && (i < array.length) ; i++) {
    const r = GetRandomPositiveNumber(i, quantity);
    const item = array[r];
    array[r] = array[i];
    array[i] = item;
  }
  return array.slice(0, quantity);
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

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {GetRandomPositiveNumber, CheckStringLength, showAlert, debounce, throttle};
