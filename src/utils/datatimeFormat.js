export function whatsappTimeDisplay(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;

    // Milliseconds in different time intervals
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    // Calculate the difference in time
    if (diff < minute) {
        return "just now";
    } else if (diff < 2 * minute) {
        return "1 min";
    } else if (diff < hour) {
        return Math.floor(diff / minute) + " mins";
    } else if (diff < 2 * hour) {
        return "1 hour";
    } else if (diff < day) {
        return Math.floor(diff / hour) + " hours";
    } else if (diff < 2 * day) {
        return "yesterday";
    } else if (diff < 7 * day) {
        // If within the last 7 days, return the day name
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[time.getDay()];
    } else {
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      return time.toLocaleDateString('en-US', options);
    }
}