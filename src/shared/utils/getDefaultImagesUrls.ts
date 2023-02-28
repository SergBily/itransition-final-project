import { defaultImagesUrls } from '../constants/collectionDefaultImage';

const getDefaultImagesUrls = (t: string): string => {
  let imageUrl: string = '';
  switch (t) {
    case 'books':
      imageUrl = defaultImagesUrls.BOOKS;
      break;
    case 'cars':
      imageUrl = defaultImagesUrls.CARS;
      break;
    case 'wine':
      imageUrl = defaultImagesUrls.WINE;
      break;
    case 'stamps':
      imageUrl = defaultImagesUrls.STAMPS;
      break;
    default:
      imageUrl = defaultImagesUrls.PAINTING;
      break;
  }
  return imageUrl;
};

export default getDefaultImagesUrls;
