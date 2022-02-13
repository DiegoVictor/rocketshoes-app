import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from '~/components/Header';
import navigation from '~/services/navigation';
import Home from '~/pages/Home';
import Cart from '~/pages/Cart';

const { Navigator, Screen } = createNativeStackNavigator();

export default () => (
  <NavigationContainer ref={navigation}>
    <Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: '#191920',
        },
        header: () => <Header />,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Cart" component={Cart} />
    </Navigator>
  </NavigationContainer>
);
