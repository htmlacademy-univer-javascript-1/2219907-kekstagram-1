const form = document.querySelector('.img-upload__form');
const image = form.querySelector('.img-upload__preview img');
const lowerScaleBtn = form.querySelector('.scale__control--smaller');
const biggerScaleBtn = form.querySelector('.scale__control--bigger');
const scaleValueInput = form.querySelector('.scale__control--value');
const effectsList = form.querySelector('.effects__list');
const slider = form.querySelector('.effect-level__slider');
const effectLevelField = form.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevelField.querySelector('.effect-level__value');

let currentScale = 100;
let currentEffect = '';
const effectsData = {
  'chrome': { filter: 'grayscale(~)', options: { range: { min: 0, max: 1, }, start: 1, step: 0.1, connect: 'lower' } },
  'sepia': { filter: 'sepia(~)', options: { range: { min: 0, max: 1, }, start: 1, step: 0.1, connect: 'lower' } },
  'marvin': { filter: 'invert(~%)', options: { range: { min: 0, max: 100, }, start: 100, step: 1, connect: 'lower' } },
  'phobos': { filter: 'blur(~px)', options: { range: { min: 0, max: 3, }, start: 3, step: 0.1, connect: 'lower' } },
  'heat': { filter: 'brightness(~)', options: { range: { min: 1, max: 3, }, start: 3, step: 0.1, connect: 'lower' } },
};
noUiSlider.create(slider, effectsData['chrome'].options);
slider.noUiSlider.on('change', onSliderChange);

export function enableEditTools() {
  currentScale = 100;
  lowerScaleBtn.addEventListener('click', changeScale(true));
  biggerScaleBtn.addEventListener('click', changeScale(false));
  effectsList.addEventListener('click', onEffectClick);
  effectLevelField.classList.add('visually-hidden');
  slider.noUiSlider.updateOptions(effectsData['chrome'].options);
}

export function disableEditTools() {
  lowerScaleBtn.removeEventListener('click', changeScale(true));
  biggerScaleBtn.removeEventListener('click', changeScale(false));
  effectLevelField.classList.add('visually-hidden');
  image.style.filter = null;
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
    if (currentEffect !== '') {
      image.classList.remove(`effects__preview--${currentEffect}`);
    }
    image.classList.add(`effects__preview--${effect}`);
    currentEffect = effect;

    if (effect === 'none') {
      effectLevelField.classList.add('visually-hidden');
      image.style.filter = null;
      effectLevelValue.value = 100;
    } else {
      effectLevelField.classList.remove('visually-hidden');
      slider.noUiSlider.updateOptions(effectsData[effect].options);
      onSliderChange();}
  }
}

function onSliderChange() {
  const effectLevel = slider.noUiSlider.get();
  effectLevelValue.value = effectLevel;
  image.style.filter = effectsData[currentEffect].filter.replace('~', effectLevel);
}
