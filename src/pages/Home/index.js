import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialDesignIcons as Icon } from '@react-native-vector-icons/material-design-icons';
import { FlatList, ScrollView } from 'react-native';

import { formatPrice } from '~/util/format';
import { addToCartRequest } from '~/store/actions/cart';
import api from '~/services/api';
import {
  Container,
  Product,
  Preview,
  Name,
  Price,
  AddButton,
  AddButtonText,
  Amount,
  AmountText,
} from './styles';

export default () => {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state => {
    return state.cart.reduce((sum, product) => {
      sum[product.id] = product.amount;
      return sum;
    }, {});
  });

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await api.get('products');
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
    })();
  }, []);

  return (
    <ScrollView>
      <Container>
        <FlatList
          horizontal
          data={products}
          extraData={amount}
          keyExtractor={product => String(product.id)}
          renderItem={({ item }) => (
            <Product testID={`product_${item.id}`}>
              <Preview source={{ uri: item.image }} />
              <Name testID={`product_title_${item.id}`}>{item.title}</Name>
              <Price testID={`product_price_${item.id}`}>
                {item.priceFormatted}
              </Price>
              <AddButton
                testID={`product_add_${item.id}`}
                onPress={() => dispatch(addToCartRequest(item.id))}
              >
                <Amount>
                  <Icon name="add-shopping-cart" color="#FFF" size={20} />
                  <AmountText>{amount[item.id] || 0}</AmountText>
                </Amount>
                <AddButtonText>Adicionar</AddButtonText>
              </AddButton>
            </Product>
          )}
        />
      </Container>
    </ScrollView>
  );
};
