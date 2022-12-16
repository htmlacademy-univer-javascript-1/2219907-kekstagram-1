import { getData } from './api.js';
import { drawPhotos } from './draw.js';
import './form.js';
import { onFail } from './util.js';

getData(onSuccess, onFail);

function onSuccess(data) {
  drawPhotos(data);
}


