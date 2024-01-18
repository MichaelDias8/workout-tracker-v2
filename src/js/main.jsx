import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './Components/App/App.jsx';
import { Provider } from 'react-redux';
import store from './Store/store.js';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

//import Test from './Components/Test.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>    
    <App/>
  </Provider>
);