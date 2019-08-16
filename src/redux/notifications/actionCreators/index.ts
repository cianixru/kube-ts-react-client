import { CLOSE_SNACKBAR, ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from '../actions';
import { Notification } from '../reducer';

export interface Options {
  readonly key?: string;
}

export const enqueueSnackbar = (notification: Notification) => ({
  payload: {
    notification: {
      ...notification,
      key: notification.key,
    },
  },
  type: ENQUEUE_SNACKBAR,
});

export const closeSnackbar = (key?: string) => ({
  payload: {
    notification: {
      dismissAll: !key, // dismiss all if no key has been defined
      key,
    },
  },
  type: CLOSE_SNACKBAR,
});

export const removeSnackbar = (key: string) => ({
  payload: {
    notification: {
      key,
    },
  },
  type: REMOVE_SNACKBAR,
});
