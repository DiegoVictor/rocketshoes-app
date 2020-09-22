import { runSaga } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';
import faker from 'faker';
import { Alert } from 'react-native';

import { updateAmount, addToCart } from '~/store/sagas/cart';
import {
  updateAmountRequest,
  updateAmountSuccess,
  addToCartRequest,
  addToCartSuccess,
} from '~/store/actions/cart';
import { navigate } from '~/services/navigator';
import factory from '../../../utils/factory';
import { formatPrice } from '~/util/format';

jest.mock('redux-saga/effects');
jest.mock('~/services/navigator');

describe('Cart saga', () => {
  it('should be able update item amount', async () => {
    const dispatch = jest.fn();
    const product = await factory.attrs('Product');
    const amount = faker.random.number({ min: 1, max: product.amount });

    call.mockImplementation(() => ({ data: product }));

    await runSaga(
      { dispatch },
      updateAmount,
      updateAmountRequest(product.id, amount)
    ).toPromise();

    expect(put).toHaveBeenCalledWith(updateAmountSuccess(product.id, amount));
  });

  it('should not be able update item amount with invalid amount', async () => {
    const dispatch = jest.fn();
    const product = await factory.attrs('Product');
    const amount = faker.random.number({ max: -1 });

    put.mockClear();

    call.mockImplementation(() => ({ data: product }));

    await runSaga(
      { dispatch },
      updateAmount,
      updateAmountRequest(product.id, amount)
    ).toPromise();

    expect(put).not.toHaveBeenCalled();
  });

  it('should not be able update item amount', async () => {
    const dispatch = jest.fn();
    Alert.alert = jest.fn();

    const product = await factory.attrs('Product');
    const amount = faker.random.number({ min: 6 });

    call.mockImplementation(() => ({ data: product }));

    await runSaga(
      { dispatch },
      updateAmount,
      updateAmountRequest(product.id, amount)
    ).toPromise();

    expect(Alert.alert).toHaveBeenCalledWith(
      'Quantidade solicitada fora do estoque'
    );
  });

  it('should be able to add item to cart', async () => {
    const dispatch = jest.fn();
    const stock = await factory.attrs('Stock', {
      amount: faker.random.number({ min: 5 }),
    });
    const product = await factory.attrs('Product');
    product.priceFormatted = formatPrice(product.price);

    select.mockImplementation(cb => cb({ cart: [] }));
    call.mockImplementation((cb, uri) => {
      if (uri === `/stock/${product.id}`) {
        return { data: stock };
      }
      return { data: product };
    });

    navigate.mockImplementation(() => {});

    await runSaga(
      { dispatch },
      addToCart,
      addToCartRequest(product.id)
    ).toPromise();

    expect(put).toHaveBeenCalledWith(
      addToCartSuccess({
        ...product,
        amount: 1,
        priceFormatted: product.priceFormatted,
      })
    );
    expect(navigate).toHaveBeenCalledWith('Cart');
  });

  it('should be able to increase item amount', async () => {
    const dispatch = jest.fn();
    const stock = await factory.attrs('Stock', {
      amount: faker.random.number({ min: 5 }),
    });
    const product = await factory.attrs('Product', {
      amount: faker.random.number({ min: 1, max: stock.amount - 1 }),
    });

    select.mockImplementation(cb => cb({ cart: [product] }));
    call.mockImplementation((cb, uri) => {
      if (uri === `/stock/${product.id}`) {
        return { data: stock };
      }
      return { data: product };
    });

    await runSaga(
      { dispatch },
      addToCart,
      addToCartRequest(product.id)
    ).toPromise();

    expect(put).toHaveBeenCalledWith(
      updateAmountSuccess(product.id, product.amount + 1)
    );
  });

  it('should not be able to increase item amount', async () => {
    const dispatch = jest.fn();
    const stock = await factory.attrs('Stock', {
      amount: faker.random.number({ max: 5 }),
    });
    const product = await factory.attrs('Product', {
      amount: faker.random.number({ min: 5 }),
    });

    select.mockImplementation(cb => cb({ cart: [product] }));
    call.mockImplementation((cb, uri) => {
      if (uri === `/stock/${product.id}`) {
        return { data: stock };
      }
      return { data: product };
    });
    Alert.alert = jest.fn();

    await runSaga(
      { dispatch },
      addToCart,
      addToCartRequest(product.id)
    ).toPromise();

    expect(Alert.alert).toHaveBeenCalledWith(
      'Quantidade solicitada fora do estoque'
    );
  });
});
