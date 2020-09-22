import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { formatPrice } from '~/util/format';
import { updateAmountRequest, removeFromCart } from '~/store/actions/cart';
import {
  Container,
  Product,
  ProductImage,
  Details,
  Price,
  Remove,
  Quantity,
  QuantityAmount,
  Header,
  Subtotal,
  Total,
  Finish,
  TotalText,
  TotalAmount,
  FinishText,
  Empty,
  Center,
} from './styles';

export default () => {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (sum, product) => sum + product.price * product.amount,
        0,
      ),
    ),
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    })),
  );

  const cartSize = useMemo(() => cart.length, [cart]);
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Container>
        {cartSize > 0 ? (
          <>
            {cart.map(product => (
              <Product key={product.id} testID={`item_${product.id}`}>
                <Header>
                  <ProductImage source={{ uri: product.image }} />
                  <Details>
                    <Text>{product.title}</Text>
                    <Price testID={`item_price_${product.id}`}>
                      {product.priceFormatted}
                    </Price>
                  </Details>
                  <Remove
                    testID={`item_delete_${product.id}`}
                    onPress={() => dispatch(removeFromCart(product.id))}
                  >
                    <Icon name="delete-forever" size={24} color="#7159C1" />
                  </Remove>
                </Header>
                <Quantity>
                  <TouchableOpacity
                    testID={`item_decrement_${product.id}`}
                    onPress={() =>
                      dispatch(
                        updateAmountRequest(product.id, product.amount - 1),
                      )
                    }
                  >
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color="#7159C1"
                    />
                  </TouchableOpacity>
                  <QuantityAmount value={String(product.amount)} />
                  <TouchableOpacity
                    testID={`item_increment_${product.id}`}
                    onPress={() =>
                      dispatch(
                        updateAmountRequest(product.id, product.amount + 1),
                      )
                    }
                  >
                    <Icon name="add-circle-outline" size={20} color="#7159C1" />
                  </TouchableOpacity>
                  <Subtotal testID={`item_subtotal_${product.id}`}>
                    {product.subtotal}
                  </Subtotal>
                </Quantity>
              </Product>
            ))}

            <Total>
              <TotalText>TOTAL</TotalText>
              <TotalAmount testID="total">{total}</TotalAmount>
              <Finish>
                <FinishText>Finalizar Pedido</FinishText>
              </Finish>
            </Total>
          </>
        ) : (
          <Center>
            <Icon name="remove-shopping-cart" size={64} color="#eee" />
            <Empty>Seu carrinho está vazio.</Empty>
          </Center>
        )}
      </Container>
    </ScrollView>
  );
};
