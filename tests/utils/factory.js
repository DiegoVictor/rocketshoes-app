import { faker } from '@faker-js/faker';
import { factory } from 'factory-girl';

factory.define(
  'Product',
  {},
  {
    id: faker.number.int,
    title: faker.commerce.productName,
    image: faker.image.imageUrl,
    amount: () => faker.number.int({ min: 2, max: 5 }),
    price: faker.number.int,
  },
);

factory.define(
  'Stock',
  {},
  {
    id: faker.number.int,
    amount: () => faker.number.int({ min: 2, max: 5 }),
  },
);

export default factory;
