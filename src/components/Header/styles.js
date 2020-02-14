import styled from 'styled-components/native';

import Rocketshoes from '~/assets/rocketshoes.png';

export const Container = styled.View`
  background: #191920;
  flex-direction: row;
  height: 64px;
  justify-content: space-between;
  padding: 20px;
`;

export const Logo = styled.Image.attrs({
  source: Rocketshoes,
  resizeMode: 'cover',
})`
  width: 185px;
  height: 24px;
`;

export const Basket = styled.TouchableOpacity`
  align-items: flex-end;
  flex: 1;
  height: 24px;
  justify-content: flex-end;
  width: 24px;
`;

export const Amount = styled.Text`
  background: #7159c1;
  border-radius: 9px;
  color: #fff;
  font-size: 12px;
  min-height: 18px;
  min-width: 18px;
  overflow: hidden;
  padding: 2px;
  position: absolute;
  right: -8px;
  text-align: center;
  top: -8px;
`;
