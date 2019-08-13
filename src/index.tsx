/* istanbul ignore next */
import { ThemeProvider } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import config from './config';
import LoggerContext from './contexts/logger';
import { authDataRetrievalRequested } from './redux/auth/actionCreators';
import configureStore, { history } from './redux/configureStore';
import loggerFactory from './services/logger';
import defaultTheme from './themes/default';

const store = configureStore();

const logger = loggerFactory(config.logger);

store.dispatch(authDataRetrievalRequested());

render(
  <Provider store={store}>
    <LoggerContext.Provider value={logger}>
      <ThemeProvider theme={defaultTheme}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </ThemeProvider>
    </LoggerContext.Provider>
  </Provider>,
  document.getElementById('root')
);
