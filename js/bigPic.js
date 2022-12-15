const bigPicContainer = document.querySelector('.big-picture');
const commentList = bigPicContainer.querySelector('.social__comments');
const commentTemplate = commentList.querySelector('.social__comment');
const closeButon = bigPicContainer.querySelector('.cancel');

export function bigPicShow(photosData) {
  const commentsFragment = document.createDocumentFragment();

  bigPicContainer.querySelector('.big-picture__img img').src = photosData.url;
  bigPicContainer.querySelector('.social__caption').textContent = photosData.description;
  bigPicContainer.querySelector('.likes-count').textContent = photosData.likes;
  bigPicContainer.querySelector('.comments-count').textContent = photosData.comments.length;
  bigPicContainer.querySelector('.social__comment-count').classList.add('hidden');
  bigPicContainer.querySelector('.comments-loader').classList.add('hidden');

  photosData.comments.forEach((comment) => {
    commentsFragment.append(createComment(comment));
  });

  closeButon.addEventListener('click', bigPicClose);
  document.addEventListener('keydown', onEscClose);

  commentList.innerHTML = '';
  commentList.append(commentsFragment);
  bigPicContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function bigPicClose() {
  bigPicContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscClose);
  closeButon.removeEventListener('click', bigPicClose);
}

function onEscClose(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicClose();
  }
}

function createComment(comment) {
  const newComment = commentTemplate.cloneNode(true);
  const newCommentImage = newComment.querySelector('img');
  newCommentImage.src = comment.avatar;
  newCommentImage.alt = comment.name;
  newComment.querySelector('p').textContent = comment.message;
  return newComment;
}
