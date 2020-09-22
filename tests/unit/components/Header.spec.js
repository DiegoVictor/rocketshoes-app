import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useSelector } from 'react-redux';

import Header from '~/components/Header';

jest.mock('react-redux');

describe('Header component', () => {
  const navigate = jest.fn();

  it('should be able to go to Home page', () => {
    useSelector.mockImplementation(cd => cd({ cart: [] }));

    const { getByTestId } = render(<Header navigate={navigate} />);

    fireEvent.press(getByTestId('home'));
    expect(navigate).toHaveBeenCalledWith('Home');
  });

  it('should be able to go to Cart page', () => {
    useSelector.mockImplementation(cd => cd({ cart: [] }));

    const { getByTestId } = render(<Header navigate={navigate} />);

    fireEvent.press(getByTestId('cart'));
    expect(navigate).toHaveBeenCalledWith('Cart');
  });
});
