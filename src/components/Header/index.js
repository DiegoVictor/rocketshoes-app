import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { MaterialDesignIcons as Icon } from '@react-native-vector-icons/material-design-icons';
import { useSelector } from 'react-redux';

import { Container, Logo, Basket, Amount } from './styles';

export default () => {
  const cartSize = useSelector(state => state.cart.length);
  const { navigate } = useNavigation();

  return (
    <Container>
      <TouchableOpacity testID="home" onPress={() => navigate('Home')}>
        <Logo />
      </TouchableOpacity>

      <Basket testID="cart" onPress={() => navigate('Cart')}>
        <>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <Amount>{cartSize}</Amount>
        </>
      </Basket>
    </Container>
  );
};
