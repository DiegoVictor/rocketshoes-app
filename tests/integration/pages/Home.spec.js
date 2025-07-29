import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { faker } from '@faker-js/faker';
import { fireEvent, act, render, waitFor } from '@testing-library/react-native';

import api from '~/services/api';
import Home from '~/pages/Home';
import { addToCartRequest } from '~/store/actions/cart';
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

const apiMock = new MockAdapter(api);
const price = faker.number.int(100);

describe('Home page', () => {
  it('should be able to see an item in the dashboard', async () => {
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

    apiMock.onGet('products').reply(200, [product]);

    const { getByTestId } = render(<Home />);
    await waitFor(() => getByTestId(`product_${product.id}`));

    expect(getByTestId(`product_${product.id}`)).toBeTruthy();

    const productTitle = getByTestId(`product_title_${product.id}`);
    expect(productTitle).toBeTruthy();
    expect(productTitle.props.children).toBe(product.title);

    const productPrice = getByTestId(`product_price_${product.id}`);
    expect(productPrice).toBeTruthy();
    expect(productPrice.props.children).toBe(`R$ ${product.price.toFixed(2)}`);
  });

  it('should be able to add item to cart', async () => {
    const dispatch = jest.fn();
    const product = await factory.attrs('Product', {
      price,
      priceFormatted: `R$ ${price}.00`,
    });

    mockUseDispatch.mockReturnValue(dispatch);
    mockUseSelector.mockImplementation(cb =>
      cb({
        cart: [],
      }),
    );

    apiMock.onGet('products').reply(200, [product]);

    const { getByTestId } = render(<Home />);

    await waitFor(() => getByTestId(`product_add_${product.id}`));

    const button = getByTestId(`product_add_${product.id}`);
    expect(button).toBeTruthy();

    await act(async () => {
      fireEvent.press(button);
    });
    expect(dispatch).toHaveBeenCalledWith(addToCartRequest(product.id));
  });
});
