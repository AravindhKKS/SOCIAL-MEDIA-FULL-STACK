// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import TimeAgo from 'javascript-time-ago';
// import en from 'javascript-time-ago/locale/en';
// import ru from 'javascript-time-ago/locale/ru';
// import AuthContextProvider from './context/AuthContext';

// TimeAgo.addDefaultLocale(en)
// TimeAgo.addLocale(ru)

// ReactDOM.render(
//   <React.StrictMode>
//     <AuthContextProvider>
//       <App />
//     </AuthContextProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import React from 'react';
import { createRoot } from 'react-dom/client'; // Step 1
import App from './App';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
import AuthContextProvider from './context/AuthContext';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const root = createRoot(document.getElementById('root')); // Step 2

root.render( // Step 3
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
