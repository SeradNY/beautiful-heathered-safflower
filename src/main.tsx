import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import App from './App'; // Import the main App component
import './main.css'; // Import the main CSS file for styling

// Create a root element for the React application
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render the App component within the root element
root.render(
  <React.StrictMode>
    <App /> {/* Main application component */}
  </React.StrictMode>
);
