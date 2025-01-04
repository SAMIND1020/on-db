import { useState, useEffect } from "react";

const useReverseGeocoding = (position) => {
    const [info, setInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetchInfo, setFetchInfo] = useState(true);

    const handleSetFetchInfo = (info) => {
        setFetchInfo(false);
        setInfo(info);
        return () => {
            setFetchInfo(true);
        };
    };

    useEffect(() => {
        const fetchReverseGeocoding = async () => {
            if (!position || !fetchInfo) return setFetchInfo((f) => !f);

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setInfo(data);
            } catch (err) {
                console.error("Failed to fetch reverse geocoding info:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReverseGeocoding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    return { info, isLoading, error, setFetch: handleSetFetchInfo };
};

export default useReverseGeocoding;
