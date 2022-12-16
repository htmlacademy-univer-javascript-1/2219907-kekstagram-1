import { clearPictures, drawPhotos } from './draw.js';

const filters = document.querySelector('.img-filters');
const buttons = filters.querySelectorAll('button');

export function activateFilters(data) {
  filters.classList.remove('img-filters--inactive');
  buttons.forEach((button) => button.addEventListener('click', (evt) => {filterChange(evt, data);}));
}

function filterChange(evt, data) {
  const activeClass = 'img-filters__button--active';
  filters.querySelector(`.${activeClass}`).classList.remove(activeClass);
  evt.target.classList.add(activeClass);
  clearPictures();
  switch (evt.target.id) {
    case 'filter-default':
      drawPhotos(data);
      break;
    case 'filter-random':
      break;
    case 'filter-discussed':
      drawPhotos(data.slice().sort((photo1, photo2) => photo2.comments.length - photo1.comments.length));
      break;
  }
}
