import React, { useEffect, useState } from 'react'; // Import necessary React hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import MessagesInfo from '../../Components/MessagesInfo/MessagesInfo'; // Import MessagesInfo component
import { useProfile } from '../../Hooks/useProfile'; // Custom hook for user profile
import { useUser } from '../../Hooks/useUser'; // Custom hook for user data
import { diffYears } from '../../Utils/dateUtils'; // Utility function to calculate age
import { User } from '../../Interfaces/UserInterface'; // User interface type
import { useContextLetter } from '../../Context/LetterContext'; // Context for managing letter state

const FormLetter: React.FC = () => {
    // Hook for navigation
    const navigate = useNavigate();

    // Access context for letter management
    const { setLetter } = useContextLetter();

    // State variables for user input and errors
    const [name, setName] = useState<string>(''); // State for user name input
    const [text, setText] = useState<string>(''); // State for user wish input
    const [error, setError] = useState<number>(0); // State for error type
    const [currentUser, setCurrentUser] = useState<User>(); // State for current user

    // Fetching users and user profile data
    const { users, fetchUser } = useUser(); // Custom hook to manage users
    const { userProfile, fetchUserProfile } = useProfile(); // Custom hook to manage user profiles

    // Effect to check for existing user when name is typed
    useEffect(() => {
        if (name.length >= 1) {
            if (users) {
                // Check if the user exists in the users list
                const userExits = users?.reduce((acc, user) => acc || (user.username === name), false);
                if (userExits) {
                    // Filter the user data based on the input name
                    const userFiltered = users?.filter((sr) => (sr.username === name))[0];
                    setCurrentUser(userFiltered); // Set the current user state
                    fetchUserProfile(); // Fetch the user profile data
                    setError(0); // Reset error state
                } else {
                    setError(1); // Set error for user not found
                }
            } else {
                fetchUser(); // Fetch users if not available
            }
        }
    }, [name]); // Effect runs when the name changes

    // Function to check the form validity before submission
    const checkForm = () => {
        if (currentUser) {
            // Find the profile corresponding to the current user
            const currentuUserProfile = userProfile.filter(pr => pr.userUid === currentUser.uid)[0];
            if (currentuUserProfile) {
                // Calculate the age of the user
                const is10yo = diffYears(currentuUserProfile.birthdate);
                if (is10yo <= 10) {
                    setError(0); // Reset error if the user is under 10
                    if (text.length > 0) {
                        // Set the letter details in context and navigate to success page
                        setLetter(currentUser.username, currentuUserProfile.address, text);
                        navigate('/success');
                    } else {
                        setError(3); // Set error for empty wish text
                    }
                } else {
                    setError(2); // Set error for age over 10
                }
            }
        }
    };

    return (
        <div className="dashboard"> {/* Main container for the form */}
            <header>
                <h1>A letter to Santa</h1> {/* Header for the form */}
            </header>

            <main>
                <p>Ho ho ho, what do you want for Christmas?</p> {/* Instruction text */}

                {/* Input for username */}
                who are you?
                <input
                    name="userid"
                    placeholder="charlie.brown"
                    value={name}
                    onChange={(e) => setName(e.target.value)} /> {/* Update name state on change */}

                {/* Form for wish input */}
                <form method="post">
                    what do you want for Christmas?
                    <textarea
                        name="wish"
                        placeholder="Gifts!"
                        value={text}
                        onChange={(e) => setText(e.target.value)} // Update wish text state on change
                    ></textarea>
                    <br />
                    <div onClick={() => checkForm()} id="submit-letter">Send</div> {/* Button to send letter */}
                </form>
            </main>
            <MessagesInfo type={error} /> {/* Display error messages based on error state */}
            <footer>
                Made with
                <a href="https://glitch.com">Glitch</a>! {/* Footer */}
            </footer>
            <div></div>
        </div >
    );
};

export default FormLetter; // Export the FormLetter component
