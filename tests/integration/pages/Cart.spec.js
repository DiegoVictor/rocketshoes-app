import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';

import Cart from '~/pages/Cart';
import { removeFromCart, updateAmountRequest } from '~/store/actions/cart';
import factory from '../../utils/factory';

jest.mock('~/util/format', () => {
  return {
    formatPrice: value => `R$ ${value.toFixed(2)}`,
  };
});

const mockUseSelector = jest.fn();
const mockUseDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: cb => mockUseSelector(cb),
  useDispatch: () => mockUseDispatch(),
}));

const price = faker.number.int({ min: 1, max: 100 });

describe('Cart page', () => {
  it('should be able to see an item on the cart', async () => {
    const product = await factory.attrs('Product', {
      price,
      priceFormatted: `R$ ${price}.00`,
    });

    mockUseDispatch.mockReturnValue(jest.fn());
    mockUseSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      }),
    );

    const { getByTestId, getByText } = render(<Cart />);

    expect(getByTestId(`item_${product.id}`)).toBeTruthy();
    expect(getByText(product.title)).toBeTruthy();
    expect(getByTestId(`item_price_${product.id}`)).toHaveTextContent(
      product.priceFormatted,
    );
    expect(getByTestId(`item_subtotal_${product.id}`)).toHaveTextContent(
      `R$ ${product.price * product.amount}.00`,
    );
    expect(getByTestId('total')).toHaveTextContent(
      `R$ ${product.price * product.amount}.00`,
    );
  });

  it('should be able to see the cart empty', async () => {
    mockUseDispatch.mockReturnValue(jest.fn());
    mockUseSelector.mockImplementation(cb =>
      cb({
        cart: [],
      }),
    );

    const { getByText } = render(<Cart />);

    expect(getByText('Seu carrinho está vazio.')).toBeTruthy();
  });

  it('should be able to remove an item from the cart', async () => {
    const product = await factory.attrs('Product', {
      price,
      priceFormatted: `R$ ${price}.00`,
    });
    const dispatch = jest.fn();

    mockUseDispatch.mockReturnValue(dispatch);
    mockUseSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      }),
    );
    const { getByTestId } = render(<Cart />);

    fireEvent.press(getByTestId(`item_delete_${product.id}`));
    expect(dispatch).toHaveBeenCalledWith(removeFromCart(product.id));
  });

  it('should be able to increase item amount', async () => {
    const product = await factory.attrs('Product', {
      price,
      priceFormatted: `R$ ${price}.00`,
    });
    const dispatch = jest.fn();

    mockUseDispatch.mockReturnValue(dispatch);
    mockUseSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      }),
    );
    const { getByTestId } = render(<Cart />);

    fireEvent.press(getByTestId(`item_increment_${product.id}`));
    expect(dispatch).toHaveBeenCalledWith(
      updateAmountRequest(product.id, product.amount + 1),
    );
  });

  it('should be able to decrease item amount', async () => {
    const product = await factory.attrs('Product', {
      price,
      priceFormatted: `R$ ${price}.00`,
    });
    const dispatch = jest.fn();

    mockUseDispatch.mockReturnValue(dispatch);
    mockUseSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      }),
    );
    const { getByTestId } = render(<Cart />);

    fireEvent.press(getByTestId(`item_decrement_${product.id}`));
    expect(dispatch).toHaveBeenCalledWith(
      updateAmountRequest(product.id, product.amount - 1),
    );
  });
});
