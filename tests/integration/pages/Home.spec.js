import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import api from '~/services/api';
import Home from '~/pages/Home';
import { addToCartRequest } from '~/store/actions/cart';
import factory from '../../utils/factory';

jest.mock('react-redux');

const apiMock = new MockAdapter(api);
const price = faker.random.number(100);

describe('Home page', () => {
  it('should be able to see an item in the dashboard', async () => {
    const product = await factory.attrs('Product', {
      price,
      priceFormatted: `R$ ${price}.00`,
    });

    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      }),
    );

    apiMock.onGet('products').reply(200, [product]);

    const { getByTestId, getByText } = render(<Home />);

    await waitFor(() =>
      expect(getByTestId(`product_${product.id}`)).toBeTruthy(),
    );

    expect(getByText(product.title)).toBeTruthy();
    expect(getByTestId(`product_price_${product.id}`)).toHaveTextContent(
      product.priceFormatted,
    );
  });

  it('should be able to add item to cart', async () => {
    const dispatch = jest.fn();
    const product = await factory.attrs('Product', {
      price,
      priceFormatted: `R$ ${price}.00`,
    });

    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        cart: [],
      }),
    );

    apiMock.onGet('products').reply(200, [product]);

    const { getByTestId } = render(<Home />);

    await waitFor(async () =>
      expect(getByTestId(`product_add_${product.id}`)).toBeTruthy(),
    );

    expect(dispatch).toHaveBeenCalledWith(addToCartRequest(product.id));
  });
});
