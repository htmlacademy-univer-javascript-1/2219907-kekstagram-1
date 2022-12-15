import { BodyModalOpen, BodyModalClose, isEscape } from './util.js';

const bigPicContainer = document.querySelector('.big-picture');
const commentList = bigPicContainer.querySelector('.social__comments');
const commentTemplate = commentList.querySelector('.social__comment');
const closeButton = bigPicContainer.querySelector('.cancel');
const curCommentCount = bigPicContainer.querySelector('.current-comments-count');
const moreCommBut = bigPicContainer.querySelector('.social__comments-loader');

export function bigPicShow(photosData) {
  bigPicContainer.querySelector('.big-picture__img img').src = photosData.url;
  bigPicContainer.querySelector('.social__caption').textContent = photosData.description;
  bigPicContainer.querySelector('.likes-count').textContent = photosData.likes;
  bigPicContainer.querySelector('.comments-count').textContent = photosData.comments.length;

  commentList.innerHTML = '';
  moreCommBut.classList.remove('hidden');
  drawComments(photosData);
  moreCommBut.addEventListener('click', () => {drawComments(photosData);});

  closeButton.addEventListener('click', bigPicClose);
  document.addEventListener('keydown', onEscClose);

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

function drawComments(photosData) {
  const commentsFragment = document.createDocumentFragment();
  const curCount = commentList.childElementCount;

  photosData.comments.slice(curCount, curCount + 5).forEach((comment) => {
    commentsFragment.append(createComment(comment));
  });

  curCommentCount.textContent = curCount + commentsFragment.childElementCount;
  commentList.append(commentsFragment);

  if (photosData.comments.length - commentList.childElementCount === 0) {
    moreCommBut.classList.add('hidden');
  }
}

function createComment(comment) {
  const newComment = commentTemplate.cloneNode(true);
  const newCommentImage = newComment.querySelector('img');
  newCommentImage.src = comment.avatar;
  newCommentImage.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
}
