import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  margin: 15px;
`;

export const Product = styled.View`
  margin-bottom: 20px;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const ProductImage = styled.Image`
  height: 80px;
  width: 80px;
`;

export const Details = styled.View`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
`;

export const Price = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
`;

export const Remove = styled.TouchableOpacity`
  padding: 6px;
`;

export const Quantity = styled.View`
  align-items: center;
  background-color: #eee;
  border-radius: 4px;
  flex-direction: row;
  padding: 8px;
`;

export const QuantityAmount = styled.TextInput.attrs({
  readonly: true,
})`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 5px;
  min-width: 52px;
  padding: 5px;
`;

export const Subtotal = styled.Text`
  flex: 1;
  font-weight: bold;
  font-size: 16px;
  text-align: right;
`;

export const Total = styled.View`
  margin-top: 40px;
`;

export const TotalText = styled.Text`
  color: #999;
  font-weight: bold;
  text-align: center;
`;

export const TotalAmount = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 5px;
  text-align: center;
`;

export const Finish = styled.TouchableOpacity`
  background-color: #7159c1;
  border-radius: 4px;
  padding: 12px;
`;

export const FinishText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;

export const Center = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Empty = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 18px;
`;
