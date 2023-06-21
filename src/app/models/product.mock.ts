import {
  randUuid,
  randProductName,
  randNumber,
  randSentence,
  incrementalNumber,
  randProductCategory,
  randImg,
} from '@ngneat/falso';

import { Product } from './general.model';

const factory = incrementalNumber();

export const generateOneProduct = (): Product => {
  return {
    id: randUuid(),
    title: randProductName(),
    price: randNumber({ min: 10, max: 20 }),
    description: randSentence(),
    category: {
      id: factory(),
      name: randProductCategory(),
    },
    images: [randImg(), randImg()],
  };
};

export const generateManyProducts = (size = 10): Product[] => {
  const products: Product[] = [];
  for (let index = 0; index < size; index++) {
    products.push(generateOneProduct());
  }
  return [...products];
};
