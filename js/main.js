import {CreatePosts} from './data.js';
import { drawPhotos } from './draw.js';

// eslint-disable-next-line no-unused-vars
const photos = CreatePosts(25);
drawPhotos(photos);
