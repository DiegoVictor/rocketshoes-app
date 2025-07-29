import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Header from '~/components/Header';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: cb => mockUseSelector(cb),
}));

describe('Header component', () => {
  it('should be able to go to Home page', () => {
    mockUseSelector.mockImplementation(cd => cd({ cart: [] }));

    const { getByTestId } = render(<Header />);
    fireEvent.press(getByTestId('home'));

    expect(mockedNavigate).toHaveBeenCalledWith('Home');
  });

  it('should be able to go to Cart page', () => {
    mockUseSelector.mockImplementation(cd => cd({ cart: [] }));

    const { getByTestId } = render(<Header />);

    fireEvent.press(getByTestId('cart'));
    expect(mockedNavigate).toHaveBeenCalledWith('Cart');
  });
});
