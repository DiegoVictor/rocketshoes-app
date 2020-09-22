import faker from 'faker';
import { factory } from 'factory-girl';

factory.define(
  'Product',
  {},
  {
    id: faker.random.number,
    title: faker.name.title,
    image: faker.image.imageUrl,
    amount: () => faker.random.number({ min: 2, max: 5 }),
    price: faker.random.number,
  }
);

factory.define(
  'Stock',
  {},
  {
    id: faker.random.number,
    amount: () => faker.random.number({ min: 2, max: 5 }),
  }
);

export default factory;
