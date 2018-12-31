import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppWithProvider } from './AppWithProvider';
import * as serviceWorker from './serviceWorker';
import { authenticate } from './auth';

// Application bootstrap
async function main() {
  await authenticate();

  ReactDOM.render(<AppWithProvider />, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
}

main()
.catch((error) => {
  console.log('Application failed to bootstrap');
  console.error(error);
});
