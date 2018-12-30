import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { authenticate } from './auth';

// Application bootstrap
async function main() {
  const { error } = await authenticate();
  if (error) {
    console.error(error);
    return;
  }

  ReactDOM.render(<App />, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
}

main();
