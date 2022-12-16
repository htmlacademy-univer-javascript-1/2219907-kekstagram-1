import { clearPictures, drawPhotos } from './drawPictures.js';
import { debounce, GetRandomMassivElements } from './util.js';

const filters = document.querySelector('.img-filters');
const buttons = filters.querySelectorAll('button');

export function activateFilters(data) {
  filters.classList.remove('img-filters--inactive');
  buttons.forEach((button) => button.addEventListener('click', (evt) => {filterHandler(evt, data);}));
}

function filterHandler(evt, data) {
  makeActive(evt);
  debounce(() => {filterChange(evt.target.id, data);})();
}

function makeActive(evt) {
  const activeClass = 'img-filters__button--active';
  filters.querySelector(`.${activeClass}`).classList.remove(activeClass);
  evt.target.classList.add(activeClass);
}

function filterChange(name, data) {
  clearPictures();
  switch (name) {
    case 'filter-default':
      drawPhotos(data);
      break;
    case 'filter-random':
      drawPhotos(GetRandomMassivElements(data, 10));
      break;
    case 'filter-discussed':
      drawPhotos(data.slice().sort((photo1, photo2) => photo2.comments.length - photo1.comments.length));
      break;
  }
}
