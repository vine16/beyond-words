import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement); // Create the root with React 18's API
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

reportWebVitals();
