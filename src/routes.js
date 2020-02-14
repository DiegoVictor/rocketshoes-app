import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Header from '~/components/Header';
import Home from '~/components/pages/Home';
import Cart from '~/components/pages/Cart';

export default createAppContainer(
  createStackNavigator(
    {
      Home,
      Cart,
    },
    {
      cardStyle: {
        backgroundColor: '#191920',
      },
      defaultNavigationOptions: ({ navigation }) => ({
        header: <Header {...navigation} />,
      }),
    }
  )
);
