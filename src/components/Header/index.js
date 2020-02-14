import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Logo, Basket, Amount } from './styles';

export default function Header({ navigate }) {
  const cartSize = useSelector(state => state.cart.length);
  return (
    <Container>
      <TouchableOpacity testID="home" onPress={() => navigate('Home')}>
        <Logo />
      </TouchableOpacity>

      <Basket testID="cart" onPress={() => navigate('Cart')}>
        <Icon name="shopping-basket" color="#FFF" size={24} />
        <Amount>{cartSize}</Amount>
      </Basket>
    </Container>
  );
}

Header.propTypes = {
  navigate: PropTypes.func.isRequired,
};
