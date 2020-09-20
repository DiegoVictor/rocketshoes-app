import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import cart from './reducers/cart';
import cartSaga from './sagas/cart';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    cart,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(function* rootSaga() {
  return yield all([cartSaga]);
});

export default store;
