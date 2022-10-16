/* eslint-disable no-console */
const commentMessage = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const Names = [
  'Александр',
  'Михаил',
  'Даниил',
  'Кирилл',
  'Артем',
  'Матвей',
  'Дмитрий',
  'Владимир',
  'Роман',
  'Илья',
  'Анна',
  'Василиса',
  'Мария',
  'Анастасия',
  'Софья',
  'Вероника',
  'Алиса',
  'Ксения',
  'Виктория',
  'Александра'
];

let lastId = 1;

function getRandomPositiveNumber(min, max) {
  if (min > max || max < 0 || min < 0) {
    throw new Error('Неверный аргумент');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const CheckStringLength = (str, length) => str.length <= length;

/* function CreateComments(quantity) {
  const comments = [];
  for (let i = 0; i < quantity; i++) {
    lastId++;
    comments[i] = {
      id: lastId,
      avatar: `img/avatar-${getRandomPositiveNumber(1, 6)}.svg`,
      message: commentMessage[getRandomPositiveNumber(0, commentMessage.length - 1)],
      name: Names[getRandomPositiveNumber(0, Names.length - 1)]
    };
  }
  return comments;
} */
/* function CreatePhotos(quantity) {
  const photos = [];
  for (let i = 0; i < quantity; i++) {
    lastId++;
    photos[i] = {
      id: lastId,
      url: `photos/${i + 1}.jpg`,
      description: 'Море',
      likes: getRandomPositiveNumber(15, 200),
      comments: CreateComments(getRandomPositiveNumber(1, 10))
    };
  }
  return photos;
} */

function CreateComments(quantity) {
  return [...Array(quantity).keys()].map(() => ({
    id: lastId++,
    avatar: `img/avatar-${getRandomPositiveNumber(1, 6)}.svg`,
    message: commentMessage[getRandomPositiveNumber(0, commentMessage.length - 1)],
    name: Names[getRandomPositiveNumber(0, Names.length - 1)]
  }));
}

function CreatePhotos(quantity) {
  return [...Array(quantity).keys()].map((i) => ({
    id: lastId++,
    url: `photos/${i + 1}.jpg`,
    description: 'Post',
    likes: getRandomPositiveNumber(15, 200),
    comments: CreateComments(getRandomPositiveNumber(1, 10))
  }));
}

// eslint-disable-next-line no-unused-vars
const photos = CreatePhotos(25);
