import { call, put, takeLatest } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../../api';
import {
  AUTH_DATA_ROLES,
  AUTH_DATA_TOKEN,
  AUTH_DATA_USER,
} from '../../../../constants/auth';
import http from '../../../../services/http';
import store from '../../../../services/store';
import { enqueueSnackbar } from '../../../alerts/actionCreators';
import {
  registerFailed,
  RegisterOptions,
  registerSucceeded,
} from '../../actionCreators';
import { REGISTER_REQUESTED } from '../../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
  readonly store: typeof store;
}

export const registerCreator = (options: Options) =>
  function* register(action: { payload: RegisterOptions }) {
    try {
      const api = options.createApi({
        httpClient: http,
      });

      const { user, token, roles } = yield call(
        api.auth.register,
        action.payload
      );

      store.set(AUTH_DATA_TOKEN, token);
      store.set(AUTH_DATA_ROLES, roles);
      store.set(AUTH_DATA_USER, user);

      yield put(registerSucceeded({ user, token, roles }));
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(
        enqueueSnackbar({
          message,
          variant: 'error',
        })
      );

      yield put(registerFailed(message));
    }
  };

export const createRegisterSaga = (options: Options) =>
  function* registerSaga() {
    yield takeLatest<any>(REGISTER_REQUESTED, registerCreator(options));
  };

export default createRegisterSaga({ createApi, store });
