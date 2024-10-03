import { useState } from 'react'; // Import useState from React
import { User } from '../Interfaces/UserInterface'; // Import the User interface

// Custom hook for managing user data
export const useUser = () => {
    // State to hold the array of users or null
    const [users, setUsers] = useState<User[] | null>(null);
    // State to manage loading status
    const [loading, setLoading] = useState(false);
    // State to handle error messages
    const [error, setError] = useState<string | null>(null);

    // Function to fetch users from an API
    const fetchUser = async () => {
        setLoading(true); // Set loading state to true
        setError(null);   // Reset error state to null before making a new request
        try {
            // Fetch user data from the API
            const response = await fetch(`https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json`);
            if (!response.ok) {
                // Throw an error if the response is not ok
                throw new Error('Error fetching the user');
            }
            const data = await response.json(); // Parse the response data
            setUsers(data); // Update the state with the fetched users
        } catch (err: any) {
            // Catch any errors and update the error state
            setError(err.message);
        } finally {
            // Reset loading state after fetching
            setLoading(false);
        }
    };

    // Return users, loading state, error message, and the fetch function
    return { users, loading, error, fetchUser };
};
