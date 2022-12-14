import { getData } from './api.js';
import { drawPhotos } from './drawPictures.js';
import { activateFilters } from './fileFilter.js';
import './form.js';
import { onFail } from './util.js';

getData(onSuccess, onFail);

function onSuccess(data) {
  drawPhotos(data);
  activateFilters(data);
}


