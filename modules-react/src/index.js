import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PracticeContextProvider from './context/PracticeContext';
import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <PracticeContextProvider>
      <App />
    </PracticeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
