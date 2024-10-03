import React, { useEffect } from 'react'; // Import React and useEffect hook
import { useContextLetter } from '../../Context/LetterContext'; // Import custom hook for letter context

const Success: React.FC = () => {
    const { letter } = useContextLetter(); // Get the letter data from the context

    useEffect(() => {
        // Function to send the letter to the server
        const sendLetter = async () => {
            try {
                // Make a POST request to the server with the letter data
                const response = await fetch('/api/send-letter', {
                    method: 'POST', // Specify the HTTP method
                    headers: {
                        'Content-Type': 'application/json', // Set content type to JSON
                    },
                    body: JSON.stringify(letter), // Stringify the letter object for the request body
                });

                // Check if the response is OK (status in the range 200-299)
                if (!response.ok) {
                    throw new Error('Error sending the letter'); // Throw an error if response is not OK
                }

                const data = await response.json(); // Parse the response JSON
                console.log(data); // Log the response data to the console
            } catch (error) {
                console.error('Error in the request', error); // Log any errors that occur during the fetch
            }
        };

        sendLetter(); // Call the function to send the letter
    }, [letter]); // Add 'letter' as a dependency to trigger the effect when it changes

    return (
        <div className="dashboard"> {/* Main container for the success component */}
            <header>
                <h1>Ho! Ho! Ho!</h1> {/* Header title */}
            </header>

            <main>
                <p>Your letter will be sent soon!</p> {/* Message to inform the user */}
            </main>
            <footer>
                Made with
                <a href="https://glitch.com">Glitch</a>! {/* Footer with link */}
            </footer>
            <div></div>
        </div>
    );
};

export default Success; // Export the Success component
