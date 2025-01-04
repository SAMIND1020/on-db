import { useState, useEffect, useRef } from "react";

const useSearchLocations = (query, debounceDelay = 500) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const cache = useRef({}); // Cache object
    const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced query

    // Debounce the query
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, debounceDelay);

        return () => clearTimeout(handler); // Cleanup on unmount or query change
    }, [query, debounceDelay]);

    // Fetch locations when the debouncedQuery changes
    useEffect(() => {
        const fetchLocations = async () => {
            if (!debouncedQuery) {
                setResults([]);
                return;
            }

            // Check cache first
            if (cache.current[debouncedQuery]) {
                setResults(cache.current[debouncedQuery]);
                return;
            }

            setIsLoading(true); // Start loading
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${debouncedQuery}&format=json`
                );
                const data = await response.json();

                const formattedResults =
                    data instanceof Array && data.length > 0
                        ? data.slice(0, 5)
                        : [
                              {
                                  place_id: "none",
                                  name: `No place found '${debouncedQuery}'`,
                              },
                          ];

                cache.current[debouncedQuery] = formattedResults; // Save to cache
                setResults(formattedResults);
            } catch (error) {
                console.error("Error fetching locations:", error);
                setResults([]); // Clear results on error
            } finally {
                setIsLoading(false); // End loading
            }
        };

        fetchLocations();
    }, [debouncedQuery]);

    return { results, isLoading };
};

export default useSearchLocations;
