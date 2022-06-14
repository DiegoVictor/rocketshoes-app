import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import { faker } from '@faker-js/faker';
import { fireEvent, act } from '@testing-library/react-native';

import { create } from 'react-test-renderer';
import api from '~/services/api';
import Home from '~/pages/Home';
import { addToCartRequest } from '~/store/actions/cart';
import factory from '../../utils/factory';

jest.mock('react-redux');
jest.mock('~/util/format', () => {
  return {
    formatPrice: value => `R$ ${value.toFixed(2)}`,
  };
});

describe('Home page', () => {
  const apiMock = new MockAdapter(api);
  const price = faker.datatype.number(100);

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

    let root;
    await act(async () => {
      root = create(<Home />);
    });

    expect(
      root.root.findByProps({
        testID: `product_${product.id}`,
      }),
    ).toBeTruthy();

    const productTitle = root.root.findByProps({
      testID: `product_title_${product.id}`,
    });
    expect(productTitle).toBeTruthy();
    expect(productTitle.props.children).toBe(product.title);

    const productPrice = root.root.findByProps({
      testID: `product_price_${product.id}`,
    });
    expect(productPrice).toBeTruthy();
    expect(productPrice.props.children).toBe(`R$ ${product.price.toFixed(2)}`);
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

    let root;
    await act(async () => {
      root = create(<Home />);
    });

    const button = root.root.findByProps({
      testID: `product_add_${product.id}`,
    });
    expect(button).toBeTruthy();

    await act(async () => {
      fireEvent.press(button);
    });
    expect(dispatch).toHaveBeenCalledWith(addToCartRequest(product.id));
  });
});
