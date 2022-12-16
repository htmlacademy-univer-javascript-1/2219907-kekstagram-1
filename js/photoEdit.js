import { enableScale, resetScale } from './scale.js';

const form = document.querySelector('.img-upload__form');
const image = form.querySelector('.img-upload__preview img');
const effectsList = form.querySelector('.effects__list');
const slider = form.querySelector('.effect-level__slider');
const effectLevelField = form.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevelField.querySelector('.effect-level__value');
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
  enableScale();
  effectsList.addEventListener('click', onEffectClick);
  effectLevelField.classList.add('visually-hidden');
  slider.noUiSlider.updateOptions(effectsData['chrome'].options);
}

export function disableEditTools() {
  resetScale();
  effectsList.removeEventListener('click', onEffectClick);
  effectLevelField.classList.add('visually-hidden');
  image.style.filter = null;
  image.className = null;
  effectsList.querySelectorAll('input').forEach((item) => {item.checked = item.defaultChecked;});
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
