import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import '~/config/ReactotronConfig';
import Routes from '~/routes';
import store from '~/store';
import navigator from '~/services/navigator';

export default () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <Routes ref={nav => navigator(nav)} />
    </Provider>
  );
};
