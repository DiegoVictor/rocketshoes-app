import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View``;

export const Product = styled.View`
  background-color: #fff;
  padding: 10px;
  margin: 15px;
  border-radius: 4px;
  width: 220px;
`;

export const Preview = styled.Image`
  height: 200px;
  width: 200px;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const Price = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 14px 0px;
`;

export const AddButton = styled.TouchableOpacity`
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  flex-direction: row;
  margin-top: auto;
`;

export const AddButtonText = styled.Text`
  color: #fff;
  flex: 1;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;

export const Amount = styled.View`
  align-items: center;
  background: ${darken(0.03, '#7159c1')};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: row;
  padding: 12px;
`;

export const AmountText = styled.Text`
  color: #fff;
  margin: 0px 4px 0px 10px;
`;
