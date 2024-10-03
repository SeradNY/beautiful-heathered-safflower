import React from 'react'; // Import React library

// Define the interface for props
interface MessagesInfoInterface {
    type: number; // The type of message to display
}

// Functional component that accepts a type prop
const MessagesInfo: React.FC<MessagesInfoInterface> = ({ type }) => {
    // Function to get warning messages based on the provided type
    const warnings = (type: number): string => {
        // Define a mapping of message types to actual messages
        const messages: { [key: number]: string } = {
            1: 'This user is not registered',
            2: "You don't have less than 10 years old",
            3: 'A problem has happened',
            4: 'Please, writter your letter'
        };

        // Return the corresponding message for the provided type
        // If the type is invalid or doesn't exist, return the default message (type 3)
        return messages[type] || messages[3];
    };

    return (
        <div className="messageInfo"> {/* Container for message info */}
            {/* Display the warning message if the type is greater than 0 */}
            <p>{type > 0 && warnings(type)}</p> {/* Show message based on the type */}
        </div>
    );
};

export default MessagesInfo; // Export the component for use in other parts of the application
