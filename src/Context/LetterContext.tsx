import React, { createContext, useContext, useState, ReactNode } from 'react'; // Import necessary modules and types

// Interface representing the structure of a letter
interface Letter {
    username: string; // Username of the sender
    address: string;  // Address of the sender
    requestText: string; // Text of the request (the letter content)
}

// Type definition for the LetterContext
interface LetterContextType {
    letter: Letter | null; // Current letter state or null if not set
    setLetter: (username: string, address: string, requestText: string) => void; // Function to update the letter state
}

// Create a context for managing letter state
const LetterContext = createContext<LetterContextType | undefined>(undefined);

// Provider component to wrap around parts of the app that need access to the letter context
const LetterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // State to hold the current letter details
    const [letter, setLetterState] = useState<Letter>({
        username: '',
        address: '',
        requestText: '',
    });

    // Function to update the letter state
    const setLetter = (username: string, address: string, requestText: string) => {
        setLetterState({
            username,
            address,
            requestText,
        });
    };

    return (
        // Provide the letter state and updater function to child components
        <LetterContext.Provider value={{ letter, setLetter }}>
            {children} {/* Render the children components */}
        </LetterContext.Provider>
    );
};

// Custom hook to use the LetterContext in functional components
const useContextLetter = () => {
    const context = useContext(LetterContext); // Get the context value
    if (!context) {
        // Throw an error if the hook is used outside of the provider
        throw new Error('useContextLetter must be used within a LetterProvider');
    }
    return context; // Return the context value
};

// Export the LetterProvider and the custom hook for use in other components
export { LetterProvider, useContextLetter };
