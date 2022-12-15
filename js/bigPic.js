import { BodyModalOpen, BodyModalClose, isEscape } from './util.js';

const bigPicContainer = document.querySelector('.big-picture');
const commentList = bigPicContainer.querySelector('.social__comments');
const commentTemplate = commentList.querySelector('.social__comment');
const closeButton = bigPicContainer.querySelector('.cancel');

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

  closeButton.addEventListener('click', bigPicClose);
  document.addEventListener('keydown', onEscClose);

  commentList.innerHTML = '';
  commentList.append(commentsFragment);
  bigPicContainer.classList.remove('hidden');
  BodyModalOpen();
}

function bigPicClose() {
  bigPicContainer.classList.add('hidden');
  BodyModalClose();
  document.removeEventListener('keydown', onEscClose);
  closeButton.removeEventListener('click', bigPicClose);
}

function onEscClose(evt) {
  if (isEscape(evt)) {
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
