const template = document.querySelector('#picture').content;
const picContainer = document.querySelector('.pictures');
const picFragment = document.createDocumentFragment();

export function drawPhotos(photosData) {
  for (let i=0;i<photosData.length;i++) {
    const post = template.cloneNode(true);
    const image = post.querySelector('.picture__img');
    const comments = post.querySelector('.picture__comments');
    const likes = post.querySelector('.picture__likes');

    image.src = photosData[i].url;
    comments.textContent = photosData[i].comments.length;
    likes.textContent = photosData[i].likes;
    picFragment.append(post);
  }
  picContainer.append(picFragment);
}
