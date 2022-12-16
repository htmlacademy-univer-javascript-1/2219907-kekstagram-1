const form = document.querySelector('.img-upload__form');
const image = form.querySelector('.img-upload__preview img');
const scaleValueInput = form.querySelector('.scale__control--value');
const lowerScaleBtn = form.querySelector('.scale__control--smaller');
const biggerScaleBtn = form.querySelector('.scale__control--bigger');
let currentScale = 100;

export function enableScale() {
  lowerScaleBtn.addEventListener('click', getScaleFunction(true));
  biggerScaleBtn.addEventListener('click', getScaleFunction(false));
}

export function resetScale() {
  lowerScaleBtn.removeEventListener('click', getScaleFunction(true));
  biggerScaleBtn.removeEventListener('click', getScaleFunction(false));
  currentScale = 100;
  image.style.transform = null;
  scaleValueInput.value = `${currentScale}%`;
}

export function getScaleFunction(isLower) {
  function changeScale() {
    if ((isLower && currentScale === 25) || (!isLower && currentScale === 100)) {return;}
    currentScale += isLower ? -25 : 25;
    scaleValueInput.value = `${currentScale}%`;
    image.style.transform = `scale(${currentScale / 100})`;
  }
  return changeScale;
}
