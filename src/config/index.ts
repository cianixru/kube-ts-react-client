import { LoggerFactoryOptions, LoggerType } from '../services/logger';
import getStringValue from '../utils/helpers/getStringValue';

export interface Config {
  apiUrl: string;
  assetsUrl: string;
  logger: LoggerFactoryOptions;
}

const env = (window as any)._env_;

const config: Config = {
  apiUrl: getStringValue(env.REACT_APP_API_URL, 'http://localhost:9000/api/v1'),
  assetsUrl: getStringValue(env.REACT_APP_ASSETS_URL, '/'),
  logger: {
    dummy: {
      silent:
        getStringValue(env.REACT_APP_NODE_ENV, 'production') === 'production',
    },
    sentry: {
      dsn: getStringValue(
        env.REACT_APP_SENTRY_DSN,
        'https://yourSentryUrl@sentry.io/yourSentryNumber'
      ),
    },
    type: getStringValue(env.REACT_APP_LOGGER_TYPE, 'dummy') as LoggerType,
  },
};

export default config;
