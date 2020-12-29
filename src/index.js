import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { theme } from "./assets/style/theme";
import createStore from './reducks/store/store';
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";
import { MuiThemeProvider } from "@material-ui/core"



export const history = History.createBrowserHistory();

export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
