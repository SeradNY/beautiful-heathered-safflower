import { useState } from 'react'; // Import useState from React
import { Profile } from '../Interfaces/ProfileInterface'; // Import the Profile interface

// Custom hook for managing user profile data
export const useProfile = () => {
    // State to hold the user profiles
    const [userProfile, setUserProfile] = useState<Profile[]>([]);
    // State to manage loading status
    const [loading, setLoading] = useState(false);
    // State to handle error messages
    const [error, setError] = useState<string | null>(null);

    // Function to fetch user profiles from an API
    const fetchUserProfile = async () => {
        setLoading(true); // Set loading state to true
        setError(null);   // Reset error state to null
        try {
            // Fetch user profiles from the API
            const response = await fetch(`https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json`);
            if (!response.ok) {
                // Throw an error if the response is not ok
                throw new Error('Error fetching the user');
            }
            const data = await response.json(); // Parse the response data
            setUserProfile(data); // Update the state with the fetched profiles
        } catch (err: any) {
            // Catch any errors and update the error state
            setError(err.message);
        } finally {
            // Reset loading state after fetching
            setLoading(false);
        }
    };

    // Return user profiles, loading state, error message, and the fetch function
    return { userProfile, loading, error, fetchUserProfile };
};
