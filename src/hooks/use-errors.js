import { useState } from "react";

const useErrors = (initialState) => {
    const [error, setError] = useState(initialState);

    const handleErrorOpen = (error) => {
        setError(error);
    };

    const handleErrorClose = () => {
        setError(null);
    };

    return { error, handleErrorOpen, handleErrorClose };
}

export default useErrors;