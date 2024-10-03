import { useState, useEffect } from 'react'; // Import necessary hooks from React

// Custom hook to debounce a value
function useDebounce<T>(value: T, delay: number): T {
    // State to hold the debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Create a timeout handler to update the debounced value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value); // Update the debounced value
        }, delay);

        // Cleanup function to clear the timeout if the value or delay changes
        return () => {
            clearTimeout(handler); // Clear the timeout to prevent memory leaks
        };
    }, [value, delay]); // Re-run the effect when value or delay changes

    // Return the debounced value
    return debouncedValue;
}

export default useDebounce; // Export the custom hook for use in other components
