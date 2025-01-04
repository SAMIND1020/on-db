/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import SearchInput from "../navigation_and_filters/SearchInput";
import useSearchLocations from "../../hooks/location/useSearchLocations";

const SearchLocation = ({ onSelect = () => {} }) => {
    const [input, setInput] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null); // Ref to handle clicks outside the dropdown

    // Use the custom hook
    const { results, isLoading } = useSearchLocations(input);

    // Toggle dropdown visibility based on user input
    const handleInputChange = (e) => {
        setInput(e.target.value);
        setIsDropdownVisible(e.target.value !== ""); // Show dropdown when input is not empty
    };

    // Close dropdown when clicking outside of the dropdown or input
    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target))
            setIsDropdownVisible(false); // Close dropdown if click is outside
    };

    // Attach event listener for clicks outside
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle selection of a search result
    const handleSelect = (s) => {
        onSelect(s);
        setInput(s.name); // Set input value to the selected location
        setIsDropdownVisible(false); // Close dropdown after selection
    };

    return (
        <div className="relative z-[400]" ref={dropdownRef}>
            <div
                className={`w-60 absolute right-0 ${
                    isDropdownVisible && "bg-white shadow-md rounded-bl-lg"
                }`}
            >
                <SearchInput
                    placeholder="Search for a location..."
                    value={input}
                    onChange={handleInputChange}
                />
                {isDropdownVisible && (
                    <div className="rounded-lg w-full">
                        {isLoading ? (
                            <div className="p-3 text-sm text-gray-500">
                                Loading...
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {results.map((s) => (
                                    <div
                                        className="text-sm hover:bg-secondary dark:hover:bg-secondary-dark p-3 rounded-lg cursor-pointer"
                                        key={s.place_id}
                                        onClick={() => handleSelect(s)}
                                    >
                                        {s.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchLocation;
