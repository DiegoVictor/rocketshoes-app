import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useSelector } from 'react-redux';

import Header from '~/components/Header';

jest.mock('react-redux');

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Header component', () => {
  it('should be able to go to Home page', () => {
    useSelector.mockImplementation(cd => cd({ cart: [] }));
    const { getByTestId } = render(<Header />);
    fireEvent.press(getByTestId('home'));
    expect(mockedNavigate).toHaveBeenCalledWith('Home');
  });

  it('should be able to go to Cart page', () => {
    useSelector.mockImplementation(cd => cd({ cart: [] }));

    const { getByTestId } = render(<Header />);

    fireEvent.press(getByTestId('cart'));
    expect(mockedNavigate).toHaveBeenCalledWith('Cart');
  });
});
