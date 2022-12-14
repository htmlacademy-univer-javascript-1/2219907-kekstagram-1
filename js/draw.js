import { bigPicShow } from './bigPic.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const picFragment = document.createDocumentFragment();

export function drawPhotos(photosData) {
  for (let i=0;i<photosData.length;i++) {
    const post = template.cloneNode(true);
    post.querySelector('.picture__img').src = photosData[i].url;
    post.querySelector('.picture__comments').textContent = photosData[i].comments.length;
    post.querySelector('.picture__likes').textContent = photosData[i].likes;
    post.addEventListener('click', () => {bigPicShow(photosData[i]);});
    picFragment.append(post);
  }
  picturesList.append(picFragment);
}

