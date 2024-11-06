import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoggedIn = () => {
    const [loggedIn, setLoggedIn] = useState(true);  // State to store login status
    const [loading, setLoading] = useState(false);     // State to store loading status

    const checkLogin = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/public/verify");
            if (res.status === 200) {
                setLoggedIn(true);  // Set loggedIn to true if user is authenticated
            } else {
                setLoggedIn(false);
            }
        } catch (e) {
            console.log(e);
            setLoggedIn(false);
        } finally {
            setLoading(false);  // Set loading to false after the request completes
        }
    };

    useEffect(() => {
        checkLogin(); // Check login status on mount
        const intervalId = setInterval(checkLogin, 60000); // Optional: Poll every 60 seconds

        return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }, []);

    return { loggedIn, loading };  // Return loggedIn state and loading status
};

export default useLoggedIn;