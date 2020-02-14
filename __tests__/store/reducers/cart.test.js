import faker from 'faker';

import reducer, { initial_state } from '~/store/reducers/cart';
import {
  addToCartSuccess,
  removeFromCart,
  updateAmountSuccess,
} from '~/store/actions/cart';

describe('Cart reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});
    expect(state).toBe(initial_state);
  });

  it('ADD_SUCCESS', () => {
    const product = { id: faker.random.number() };
    const state = reducer(initial_state, addToCartSuccess(product));
    expect(state).toContainEqual(product);
  });

  it('REMOVE', () => {
    const product = { id: faker.random.number() };
    const state = reducer([product], removeFromCart(product.id));
    expect(state).toHaveLength(0);
  });

  it('UPDATE_AMOUNT_SUCCESS', () => {
    const product = { id: faker.random.number(), amount: 1 };
    const amount = faker.random.number({ min: 2, max: 5 });

    const state = reducer([product], updateAmountSuccess(product.id, amount));
    expect(state).toContainEqual({
      ...product,
      amount,
    });
  });
});
