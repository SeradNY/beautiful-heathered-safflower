import React from 'react'; // Import React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components from react-router-dom
import FormLetter from './views/FormLetter/FormLetter'; // Import the FormLetter component
import { LetterProvider } from './Context/LetterContext'; // Import context provider for letter data
import { useUser } from './Hooks/useUser'; // Import custom hook for user data
import Success from './views/Success/Success'; // Import the Success component

const App: React.FC = () => {
  const users = useUser(); // Fetch user data using the custom hook (currently not used)

  return (
    <LetterProvider> {/* Provide letter context to the component tree */}
      <Router> {/* Set up React Router for navigation */}
        <Routes> {/* Define the application routes */}
          <Route path="/" element={<FormLetter />} /> {/* Route for the main form */}
          <Route path="/success" element={<Success />} /> {/* Route for success page */}
        </Routes>
      </Router>
    </LetterProvider>
  )
};

export default App; // Export the App component
