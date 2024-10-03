// Function to calculate the difference in years between a given date and the current date
export const diffYears = (dateString: string): number => {
    // Convert the input date string into a Date object
    const date = new Date(dateString);
    // Create a Date object for the current date
    const dateNow = new Date();

    // Calculate the difference in milliseconds between the current date and the input date
    const diffmms = dateNow.getTime() - date.getTime();

    // Convert the difference from milliseconds to years
    const diffYears = diffmms / (1000 * 60 * 60 * 24 * 365.25); // 365.25 accounts for leap years

    // Return the difference rounded down to the nearest whole number
    return Math.floor(diffYears);
};
