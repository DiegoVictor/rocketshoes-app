import { faker } from '@faker-js/faker';
import { factory } from 'factory-girl';

factory.define(
  'Product',
  {},
  {
    id: faker.datatype.number,
    title: faker.commerce.productName,
    image: faker.image.imageUrl,
    amount: () => faker.datatype.number({ min: 2, max: 5 }),
    price: faker.datatype.number,
  },
);

factory.define(
  'Stock',
  {},
  {
    id: faker.datatype.number,
    amount: () => faker.datatype.number({ min: 2, max: 5 }),
  },
);

export default factory;
