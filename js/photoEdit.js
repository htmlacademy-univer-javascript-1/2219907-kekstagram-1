const form = document.querySelector('.img-upload__form');
const image = form.querySelector('.img-upload__preview img');
const lowerScaleBtn = form.querySelector('.scale__control--smaller');
const biggerScaleBtn = form.querySelector('.scale__control--bigger');
const scaleValueInput = form.querySelector('.scale__control--value');
const effectsList = form.querySelector('.effects__list');
const slider = form.querySelector('.effect-level__slider');
let currentScale = 100;
let effectLevel = 100;
let currentEffect = '';

export function enableEditTools() {
  currentScale = 100;
  lowerScaleBtn.addEventListener('click', changeScale(true));
  biggerScaleBtn.addEventListener('click', changeScale(false));
  effectsList.addEventListener('click', onEffectClick);
}

export function disableEditTools() {
  lowerScaleBtn.removeEventListener('click', changeScale(true));
  biggerScaleBtn.removeEventListener('click', changeScale(false));
}

function changeScale(isLower) {
  return () => {
    if ((isLower && currentScale === 25) || (!isLower && currentScale === 100)) {return;}
    currentScale += isLower ? -25 : 25;
    scaleValueInput.value = `${currentScale}%`;
    image.style.transform = `scale(${currentScale / 100})`;
  };
}

function onEffectClick(evt) {
  if (evt.target.matches('input[type="radio"]')) {
    const effect = evt.target.value;
    image.classList.remove(...[...image.classList].filter((n) => n.indexOf('effects__preview') !== -1));
    image.classList.add(`effects__preview--${effect}`);

  }
}

function sliderCreate() {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step:1,
    connect: 'lower'
  });
  slider.noUiSlider.on('change', onSliderChange);
}

function onSliderChange() {
  effectLevel = slider.noUiSlider.get();
  setEffect(currentEffect)
}
