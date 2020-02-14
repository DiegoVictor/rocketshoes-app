import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-native';

import cart from './reducers/cart';
import cartSaga from './sagas/cart';

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: (() => {
    if (__DEV__) {
      return Reactotron.createSagaMonitor();
    }
    return null;
  })(),
});

const store = createStore(
  combineReducers({
    cart,
  }),
  (() => {
    if (__DEV__) {
      return compose(
        Reactotron.createEnhancer(),
        applyMiddleware(sagaMiddleware)
      );
    }
    return applyMiddleware(sagaMiddleware);
  })()
);

sagaMiddleware.run(function* rootSaga() {
  return yield all([cartSaga]);
});

export default store;
