import faker from 'faker';

import reducer, { initialState } from '~/store/reducers/cart';
import {
  addToCartSuccess,
  removeFromCart,
  updateAmountSuccess,
} from '~/store/actions/cart';

describe('Cart reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});
    expect(state).toBe(initialState);
  });

  it('ADD_SUCCESS', () => {
    const product = { id: faker.random.number() };
    const state = reducer(initialState, addToCartSuccess(product));
    expect(state).toContainEqual(product);
  });

  it('REMOVE', () => {
    const product = { id: faker.random.number() };
    const state = reducer(
      [product],
      removeFromCart(faker.random.number({ min: product.id + 1 })),
    );
    expect(state).toHaveLength(1);
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

  it('UPDATE_AMOUNT_SUCCESS', () => {
    const product = { id: faker.random.number(), amount: 1 };
    const amount = faker.random.number({ min: 2, max: 5 });

    const state = reducer(
      [product],
      updateAmountSuccess(faker.random.number({ min: product.id + 1 }), amount),
    );
    expect(state).toContainEqual(product);
  });
});
