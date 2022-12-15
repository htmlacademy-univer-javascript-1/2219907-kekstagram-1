import {GetRandomPositiveNumber} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
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

function CreateComments(quantity) {
  return [...Array(quantity).keys()].map(() => ({
    id: lastId++,
    avatar: `img/avatar-${GetRandomPositiveNumber(1, 6)}.svg`,
    message: MESSAGES[GetRandomPositiveNumber(0, MESSAGES.length - 1)],
    name: NAMES[GetRandomPositiveNumber(0, NAMES.length - 1)]
  }));
}

export function CreatePosts(quantity) {
  return [...Array(quantity).keys()].map((i) => ({
    id: lastId++,
    url: `photos/${i + 1}.jpg`,
    description: 'Post',
    likes: GetRandomPositiveNumber(15, 200),
    comments: CreateComments(GetRandomPositiveNumber(1, 15))
  }));
}
