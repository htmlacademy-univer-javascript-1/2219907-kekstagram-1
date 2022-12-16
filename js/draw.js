import { bigPicShow } from './bigPic.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

export function drawPhotos(photosData) {
  const picFragment = document.createDocumentFragment();

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

