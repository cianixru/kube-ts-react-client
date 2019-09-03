import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import authDataSaga from './auth/saga/authData/index';
import loginSaga from './auth/saga/login/index';
import registerSaga from './auth/saga/register/index';
import remindPasswordSaga from './auth/saga/remindPassword/index';
import resendVerifyToken from './auth/saga/resendVerifyToken/index';
import resetPasswordSaga from './auth/saga/resetPassword/index';
import createRootReducer, { State } from './rootReducer';

export const history = createBrowserHistory();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState?: State): Store {
  const middlewares = [routerMiddleware(history), sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(loginSaga);
  sagaMiddleware.run(registerSaga);
  sagaMiddleware.run(remindPasswordSaga);
  sagaMiddleware.run(resetPasswordSaga);
  sagaMiddleware.run(resendVerifyToken);
  sagaMiddleware.run(authDataSaga);

  return store;
}
