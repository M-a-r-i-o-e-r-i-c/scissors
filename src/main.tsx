import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// {
//   "functions": {
//     "source": "functions",
//     "ignore": [
//       "node_modules",
//       ".git",
//       "firebase-debug.log",
//       "firebase-debug.*.log"
//     ],
//     "linkCreated": {
//       "region": "us-central1",
//       "runtime": "nodejs14"
//     }
//   },
//   "emulators": {
//     "auth": {
//       "port": 9099
//     },
//     "functions": {
//       "port": 5002
//     },
//     "firestore": {
//       "port": 8080
//     },
//     "ui": {
//       "enabled": true
//     },
//     "singleProjectMode": true
//   },
//   "hosting": {
//     "public": "public",
//     "ignore": [
//       "firebase.json",
//       "**/.*",
//       "**/node_modules/**"
//     ],
//     "rewrites": [
//       {
//         "source": "**",
//         "destination": "/index.html"
//       }
//     ]
//   }
// }
