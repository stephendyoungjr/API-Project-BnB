import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import configureStore, { restoreCSRF, csrfFetch } from './store';
import * as sessionActions from './store/session.js'
import { ModalProvider, Modal } from './context/modal.jsx';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import { Provider } from 'react-redux';
// import configureStore from './store/store';
// import { restoreCSRF, csrfFetch } from './store/csrf';
// import * as sessionActions from './store/session';
// import { ModalProvider } from './context/Modal';
// // import { Modal } from './context/Modal';

// const store = configureStore();

// if (import.meta.env.MODE !== 'production') {
//     restoreCSRF();

//     window.csrfFetch = csrfFetch;
//     window.store = store;
//     window.sessionActions = sessionActions;
// }

// if (process.env.NODE_ENV !== 'production') {
//     window.store = store;
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <ModalProvider>
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         </ModalProvider>
//     </React.StrictMode>
// );

