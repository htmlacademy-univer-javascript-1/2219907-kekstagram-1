const bigPicContainer = document.querySelector('.big-picture');
const image = bigPicContainer.querySelector('.big-picture__img img');
const imageDiscr = bigPicContainer.querySelector('.social__caption');
const likesCount = bigPicContainer.querySelector('.likes-count');
const commentsCount = bigPicContainer.querySelector('.comments-count');
const commentList = bigPicContainer.querySelector('.social__comments');
const commentTemplate = commentList.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();
const closeBut = bigPicContainer.querySelector('.cancel');

const socComCount = bigPicContainer.querySelector('.social__comment-count');

export const bigPicShow = (photosData) => {
  image.src = photosData.url;
  imageDiscr.textContent = photosData.description;
  likesCount.textContent = photosData.likes;
  commentsCount.textContent = photosData.comments.length;
  photosData.comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    const commImg = newComment.querySelector('img');
    commImg.src = comment.avatar;
    commImg.alt = comment.name;
    newComment.querySelector('p').textContent = comment.message;
    commentsFragment.append(newComment);
  });
  closeBut.addEventListener('click', () => {bigPicClose();});
  document.onkeydown = function(evt) {
    if (evt.key === 'Escape') {bigPicClose();}
  };
  socComCount.classList.add('hidden');
  bigPicContainer.querySelector('.comments-loader').classList.add('hidden');
  commentList.innerHTML = '';
  commentList.append(commentsFragment);
  bigPicContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
};


function bigPicClose() {
  bigPicContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
}
